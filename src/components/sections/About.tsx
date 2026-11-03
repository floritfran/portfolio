"use client";

import {
  BriefcaseIcon,
  CheckIcon,
  GlobeIcon,
  GraduationCapIcon,
  MapPinIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resume } from "@/data/resume";
import { useI18n } from "@/i18n/I18nProvider";

export function About() {
  const { locale, t } = useI18n();
  const about = resume.translations[locale].about;
  const education = resume.education.filter(
    (item) => item.showOnWebsite !== false,
  );

  const facts = [
    {
      icon: MapPinIcon,
      label: t.about.facts.location,
      value: resume.personal.location[locale],
    },
    {
      icon: BriefcaseIcon,
      label: t.about.facts.experience,
      value: t.about.facts.experienceValue,
    },
    {
      icon: GraduationCapIcon,
      label: t.about.facts.education,
      value: t.about.facts.educationValue,
    },
    {
      icon: GlobeIcon,
      label: t.about.facts.english,
      value: t.about.facts.englishValue,
    },
  ];

  return (
    <Section id="about" labelledBy="about-title">
      <Reveal>
        <SectionHeading
          id="about-title"
          eyebrow={t.about.eyebrow}
          title={t.about.title}
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
        <Reveal delay={60}>
          <p className="max-w-2xl font-display text-xl leading-snug text-balance sm:text-2xl">
            {about.intro}
          </p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted text-pretty">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {t.about.principlesTitle}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {about.principles.map((principle) => (
                <li
                  key={principle}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {principle}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-card">
            <dl className="space-y-4">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-surface-raised text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                        {fact.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium">
                        {fact.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <div className="mt-6 border-t border-border pt-5">
              <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                {t.about.languagesTitle}
              </h3>
              <ul className="mt-3 space-y-3">
                {resume.languages.map((language) => (
                  <li key={language.name.es} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">
                        {language.name[locale]}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        {language.note[locale]}
                      </p>
                    </div>
                    <Badge tone="muted">{language.level[locale]}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <ul className="space-y-3">
                {education.map((item) => (
                  <li key={item.id}>
                    <p className="text-sm font-medium">{item.institution}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {item.degree[locale]}
                      {item.details ? ` · ${item.details[locale]}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
