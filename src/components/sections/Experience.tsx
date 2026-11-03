"use client";

import { BriefcaseIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resume } from "@/data/resume";
import { useI18n } from "@/i18n/I18nProvider";
import { formatPeriod } from "@/lib/date";

export function Experience() {
  const { locale, t } = useI18n();

  return (
    <Section id="experience" labelledBy="experience-title">
      <Reveal>
        <SectionHeading
          id="experience-title"
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />
      </Reveal>

      <div className="relative mt-12 space-y-8 before:absolute before:bottom-2 before:left-[1.125rem] before:top-2 before:w-px before:bg-border sm:before:left-6">
        {resume.experience.map((job, index) => {
          const translation = resume.translations[locale];
          const isCurrent = job.end === null;

          return (
            <Reveal key={job.id} delay={index * 80}>
              <article className="relative pl-12 sm:pl-20">
                <span className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface font-display text-sm font-bold text-accent sm:h-12 sm:w-12 sm:text-base">
                  {job.company.charAt(0)}
                </span>

                <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-semibold sm:text-2xl">
                          {job.company}
                        </h3>
                        {isCurrent ? (
                          <Badge tone="accent">{t.experience.current}</Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm font-medium text-muted">
                        {job.role[locale]}
                      </p>
                    </div>
                    <p className="rounded-full border border-border bg-surface-raised px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                      {formatPeriod(job.start, job.end, locale, translation.present)}
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    {job.description[locale]}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {job.bullets[locale].map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                        <span className="text-sm leading-relaxed text-muted">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <p className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                      <BriefcaseIcon className="h-3.5 w-3.5 text-accent" />
                      {t.experience.techLabel}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {job.tech.map((item) => (
                        <li key={item}>
                          <Badge tone="muted">{item}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
