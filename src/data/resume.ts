import type { Project, Resume } from "./resume.schema";
import projectsJson from "./projects.json";
import resumeJson from "./resume.json";

export const resume = resumeJson as Resume;
export const projects = projectsJson as Project[];

export const featuredProjects = projects.filter((project) => project.featured);
export const secondaryProjects = projects.filter((project) => !project.featured);
