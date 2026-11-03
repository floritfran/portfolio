"use client";

import type { ComponentType } from "react";

import {
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  LayersIcon,
  ServerIcon,
  SmartphoneIcon,
  TerminalIcon,
  type IconProps,
} from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resume } from "@/data/resume";
import { useI18n } from "@/i18n/I18nProvider";

const CORE_STACK = [
  "Java",
  "Spring Boot",
  "React",
  "TypeScript",
  "React Native",
  "PostgreSQL",
];

const CATEGORY_ICONS: Record<string, ComponentType<IconProps>> = {
  frontend: CodeIcon,
  backend: ServerIcon,
  mobile: SmartphoneIcon,
  databases: DatabaseIcon,
  devops: LayersIcon,
  testing: CheckIcon,
  tools: TerminalIcon,
};

export function Skills() {
  const { locale, t } = useI18n();

  return (
    <Section id="skills" labelledBy="skills-title">
      <Reveal>
        <SectionHeading
          id="skills-title"
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />
      </Reveal>

      <Reveal delay={60} className="mt-10">
        <div className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            {t.skills.coreLabel}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CORE_STACK.map((item) => (
              <Badge key={item} tone="accent" className="px-3 py-1.5">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resume.skills.map((category, index) => {
          const Icon = CATEGORY_ICONS[category.id] ?? CodeIcon;
          return (
            <Reveal
              key={category.id}
              delay={(index % 3) * 60}
              className="h-full"
            >
              <article className="group h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 hover:bg-surface-raised/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-raised text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {category.label[locale]}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <li key={item}>
                      <Badge tone="muted">{item}</Badge>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
