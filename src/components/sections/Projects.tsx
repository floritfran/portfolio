"use client";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects, secondaryProjects } from "@/data/resume";
import { useI18n } from "@/i18n/I18nProvider";

export function Projects() {
  const { t } = useI18n();

  return (
    <Section id="projects" labelledBy="projects-title">
      <Reveal>
        <SectionHeading
          id="projects-title"
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />
      </Reveal>

      <div className="mt-12 space-y-8">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard
              project={project}
              featured
              reverse={index % 2 === 1}
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <div className="flex items-center gap-4">
          <h3 className="font-display text-xl font-semibold">
            {t.projects.more}
          </h3>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {secondaryProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={(index % 2) * 60}
              className="h-full"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
