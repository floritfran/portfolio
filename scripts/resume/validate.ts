import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  projectsSchema,
  resumeSchema,
} from "../../src/data/resume.schema";

async function readJson(file: string) {
  return JSON.parse(await readFile(file, "utf8"));
}

function monthValue(value: string) {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month;
}

async function main() {
  const root = process.cwd();
  const resumeRaw = await readJson(path.join(root, "src/data/resume.json"));
  const projectsRaw = await readJson(path.join(root, "src/data/projects.json"));

  const resumeResult = resumeSchema.safeParse(resumeRaw);
  const projectsResult = projectsSchema.safeParse(projectsRaw);

  if (!resumeResult.success || !projectsResult.success) {
    if (!resumeResult.success) {
      console.error("[resume] Invalid resume.json");
      console.error(JSON.stringify(resumeResult.error.issues, null, 2));
    }
    if (!projectsResult.success) {
      console.error("[resume] Invalid projects.json");
      console.error(JSON.stringify(projectsResult.error.issues, null, 2));
    }
    process.exitCode = 1;
    return;
  }

  const resume = resumeResult.data;
  const projects = projectsResult.data;
  const errors: string[] = [];

  if ("phone" in resume.personal) {
    errors.push("personal.phone must not be present");
  }

  if (!resume.personal.photo.startsWith("/images/")) {
    errors.push("personal.photo should point to /images/");
  }

  const darwoft = resume.experience.find((job) => job.id === "darwoft");
  if (!darwoft?.cvOnly || darwoft.cvOnly.client !== "Claro") {
    errors.push("The CV must keep the Darwoft / Claro client context");
  }

  if (JSON.stringify(resume.translations).includes("Claro")) {
    errors.push("The website translations must stay client-agnostic");
  }

  for (const job of resume.experience) {
    if (job.end && monthValue(job.end) < monthValue(job.start)) {
      errors.push(`${job.id}: end date is before start date`);
    }

    if (job.bullets.es.length !== job.bullets.en.length) {
      errors.push(`${job.id}: ES/EN bullet counts differ`);
    }
  }

  const es = resume.translations.es;
  const en = resume.translations.en;

  if (es.about.paragraphs.length !== en.about.paragraphs.length) {
    errors.push("about.paragraphs: ES/EN lengths differ");
  }

  if (es.about.principles.length !== en.about.principles.length) {
    errors.push("about.principles: ES/EN lengths differ");
  }

  if (!es.summary.includes("5")) {
    errors.push("ES summary should mention 5+ years of experience");
  }

  if (!en.summary.includes("5")) {
    errors.push("EN summary should mention 5+ years of experience");
  }

  const uba = resume.education.find((item) => item.id === "uba");
  if (!uba?.details?.es.toLowerCase().includes("graduado")) {
    errors.push("UBA education should state that the degree is completed");
  }

  if (!resume.education.some((item) => item.id === "secondary")) {
    errors.push("Secondary education is missing");
  }

  if (!resume.education.some((item) => item.id === "fce")) {
    errors.push("English certification is missing");
  }

  const slugs = new Set<string>();
  for (const project of projects) {
    if (slugs.has(project.slug)) {
      errors.push(`duplicate project slug: ${project.slug}`);
    }
    slugs.add(project.slug);

    if (project.repo.includes("example.com")) {
      errors.push(`${project.slug}: repository URL looks like a placeholder`);
    }

    if (project.demo?.includes("example.com")) {
      errors.push(`${project.slug}: demo URL looks like a placeholder`);
    }
  }

  if (!projects.some((project) => project.featured)) {
    errors.push("At least one featured project is required");
  }

  if (errors.length > 0) {
    console.error("[resume] Validation failed:");
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `[resume] OK — ${resume.experience.length} roles, ${resume.skills.length} skill groups, ${projects.length} projects`,
  );
}

main().catch((error) => {
  console.error("[resume] Validation crashed:", error);
  process.exitCode = 1;
});
