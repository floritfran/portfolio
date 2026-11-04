"use client";

import Image from "next/image";
import { useState } from "react";

import { asset } from "@/data/site";
import type { Project } from "@/data/resume.schema";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";

type ProjectKind = "browser" | "phone" | "code";

function getKind(project: Project): ProjectKind {
  if (project.slug === "flixy") {
    return "browser";
  }
  if (project.slug === "tp2-algo-iii") {
    return "code";
  }
  return "phone";
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function BrowserGallery({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const { locale, t } = useI18n();
  const [active, setActive] = useState(0);
  const content = project.translations[locale];
  const images = project.images;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-card">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-2 flex-1 truncate rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[0.55rem] text-muted">
            flixy.app
          </span>
        </div>
        <div className="relative aspect-[16/9]">
          <Image
            src={asset(images[active])}
            alt={`${project.name} — ${content.tagline}`}
            fill
            sizes="(min-width: 1024px) 560px, 90vw"
            className="object-cover"
          />
        </div>
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`${t.projects.viewScreenshot} ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-[16/9] overflow-hidden rounded-lg border bg-surface transition",
                index === active
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={asset(image)}
                alt=""
                fill
                sizes="140px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PhoneGallery({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const { locale } = useI18n();
  const content = project.translations[locale];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className,
      )}
    >
      {project.images.map((image, index) => (
        <div
          key={image}
          className="relative w-full min-w-[88px] max-w-[140px] flex-1 basis-0 overflow-hidden rounded-[1.6rem] border-[4px] border-foreground/15 bg-background shadow-card"
        >
          <div className="relative aspect-[9/20]">
            <Image
              src={asset(image)}
              alt={`${project.name} — ${content.tagline} (${index + 1})`}
              fill
              sizes="(min-width: 1024px) 160px, 30vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BrowserPlaceholder({
  project,
  label,
}: {
  project: Project;
  label: string;
}) {
  return (
    <div className="absolute inset-4 flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 flex-1 rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[0.55rem] text-muted">
          flixy.app
        </span>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent/5" />
        <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 font-display text-sm font-bold text-accent">
          {getInitials(project.name)}
        </span>
        <p className="relative font-display text-lg font-semibold">
          {project.name}
        </p>
        <p className="relative font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
          {project.stack.slice(0, 3).join(" · ")}
        </p>
        <span className="relative mt-1 rounded-full border border-border bg-surface px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

function PhonePlaceholder({
  project,
  label,
}: {
  project: Project;
  label: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[80%] w-[34%] min-w-[6.5rem] overflow-hidden rounded-[1.4rem] border-[3px] border-foreground/15 bg-background shadow-card">
        <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-foreground/15" />
        <div className="flex h-full flex-col items-center justify-center gap-1.5 bg-gradient-to-b from-accent/15 via-transparent to-transparent p-2 text-center">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 font-display text-xs font-bold text-accent">
            {getInitials(project.name)}
          </span>
          <p className="font-display text-xs font-semibold">{project.name}</p>
          <p className="font-mono text-[0.45rem] uppercase tracking-[0.12em] text-muted">
            {project.stack.slice(0, 2).join(" · ")}
          </p>
          <span className="mt-1 rounded-full border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.4rem] uppercase tracking-[0.1em] text-muted">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function CodePlaceholder({
  project,
  label,
}: {
  project: Project;
  label: string;
}) {
  return (
    <div className="absolute inset-4 flex flex-col overflow-hidden rounded-xl border border-border bg-[#0b1118] text-[#e6edf3] shadow-card">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-[0.55rem] text-white/50">
          QuizGame.java
        </span>
      </div>
      <div className="flex-1 space-y-1.5 p-4 font-mono text-[0.55rem] leading-relaxed text-white/60">
        <p>
          <span className="text-teal-300">public class</span> QuizGame {"{"}
        </p>
        <p className="pl-3">
          <span className="text-teal-300">private final</span> Scoreboard scores;
        </p>
        <p className="pl-3">
          <span className="text-teal-300">public void</span> addQuestion(Question
          q) {"{"}
        </p>
        <p className="pl-6">scores.register(q);</p>
        <p className="pl-3">{"}"}</p>
        <p>{"}"}</p>
        <p className="pt-2 text-white/30">
          {"// "}
          {project.name} · {label}
        </p>
      </div>
    </div>
  );
}

export function ProjectVisual({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const { t } = useI18n();
  const kind = getKind(project);

  if (project.images.length > 0) {
    if (kind === "browser") {
      return <BrowserGallery project={project} className={className} />;
    }

    return <PhoneGallery project={project} className={className} />;
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      {kind === "browser" ? (
        <BrowserPlaceholder project={project} label={t.projects.soon} />
      ) : null}
      {kind === "phone" ? (
        <PhonePlaceholder project={project} label={t.projects.soon} />
      ) : null}
      {kind === "code" ? (
        <CodePlaceholder project={project} label={t.projects.soon} />
      ) : null}
    </div>
  );
}
