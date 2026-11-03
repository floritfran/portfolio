"use client";

import {
  ArrowUpRightIcon,
  DownloadIcon,
  GithubIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { Project } from "@/data/resume.schema";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({
  project,
  featured = false,
  reverse = false,
}: {
  project: Project;
  featured?: boolean;
  reverse?: boolean;
}) {
  const { locale, t } = useI18n();
  const content = project.translations[locale];
  const typeLabel =
    project.type === "academic" ? t.projects.academic : t.projects.personal;
  const visibleStack = project.stack.slice(0, featured ? 8 : 5);
  const hiddenCount = project.stack.length - visibleStack.length;
  const features = content.features.slice(0, featured ? 4 : 3);
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "h-full overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition duration-300 hover:border-accent/40 hover:shadow-card-hover",
        featured && "lg:grid lg:grid-cols-2",
      )}
    >
      <div
        className={cn(
          "flex flex-col p-6 sm:p-8",
          featured && "lg:p-10",
          featured && reverse && "lg:order-2",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{typeLabel}</Badge>
          {featured ? <Badge>{t.projects.featured}</Badge> : null}
        </div>

        <h3
          id={titleId}
          className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          {content.tagline}
        </p>

        <div className="mt-5">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
            {t.projects.problem}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {content.problem}
          </p>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
            {t.projects.features}
          </p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm leading-relaxed text-muted"
              >
                <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("mt-5 grid gap-4", featured && "sm:grid-cols-2")}>
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              {t.projects.role}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {content.role}
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              {t.projects.challenge}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {content.challenge}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
            {t.projects.stack}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {visibleStack.map((item) => (
              <li key={item}>
                <Badge tone="muted">{item}</Badge>
              </li>
            ))}
            {hiddenCount > 0 ? (
              <li>
                <Badge tone="muted">+{hiddenCount}</Badge>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          <ExternalLink
            href={project.repo}
            className={buttonStyles({ variant: "secondary", size: "sm" })}
            ariaLabel={`${t.projects.repo}: ${project.name}`}
          >
            <GithubIcon className="h-4 w-4" />
            {t.projects.repo}
          </ExternalLink>
          {project.demo ? (
            <ExternalLink
              href={project.demo}
              className={buttonStyles({ variant: "secondary", size: "sm" })}
              ariaLabel={`${t.projects.demo}: ${project.name}`}
            >
              <ArrowUpRightIcon className="h-4 w-4" />
              {t.projects.demo}
            </ExternalLink>
          ) : null}
          {project.apk ? (
            <ExternalLink
              href={project.apk}
              className={buttonStyles({ variant: "secondary", size: "sm" })}
              ariaLabel={`${t.projects.apk}: ${project.name}`}
            >
              <DownloadIcon className="h-4 w-4" />
              {t.projects.apk}
            </ExternalLink>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "relative flex items-center justify-center border-t border-border bg-surface-raised/50 p-5 sm:p-6",
          featured && "lg:border-l lg:border-t-0 lg:p-8",
          featured && reverse && "lg:order-1 lg:border-l-0 lg:border-r",
        )}
      >
        <ProjectVisual project={project} className="w-full" />
      </div>
    </article>
  );
}
