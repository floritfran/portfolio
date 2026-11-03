import { describe, expect, it } from "vitest";

import projectsJson from "@/data/projects.json";
import resumeJson from "@/data/resume.json";
import { projectsSchema, resumeSchema } from "@/data/resume.schema";

describe("portfolio content", () => {
  it("validates the resume and project data", () => {
    expect(resumeSchema.safeParse(resumeJson).success).toBe(true);
    expect(projectsSchema.safeParse(projectsJson).success).toBe(true);
  });

  it("keeps the client name out of the website copy", () => {
    expect(JSON.stringify(resumeJson.translations)).not.toContain("Claro");
    expect(resumeJson.experience[0].cvOnly?.client).toBe("Claro");
  });

  it("has the expected projects and featured entries", () => {
    expect(projectsJson).toHaveLength(4);
    expect(projectsJson.filter((project) => project.featured)).toHaveLength(2);
    expect(projectsJson.map((project) => project.slug)).toContain("flixy");
  });
});
