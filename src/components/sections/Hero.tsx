"use client";

import Image from "next/image";

import {
  ArrowDownIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/icons";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CvLinks } from "@/components/ui/CvLinks";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { asset, siteConfig } from "@/data/site";
import { resume } from "@/data/resume";
import { useI18n } from "@/i18n/I18nProvider";

export function Hero() {
  const { locale, t } = useI18n();
  const translation = resume.translations[locale];

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <Reveal>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-accent">
            {t.hero.eyebrow}
          </p>
          <p className="mt-4 text-sm font-medium text-muted">
            {t.hero.greeting}
          </p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
            {resume.personal.name}
          </h1>
          <p className="mt-4 font-display text-xl text-muted sm:text-2xl">
            {translation.title}
          </p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted backdrop-blur">
            <MapPinIcon className="h-3.5 w-3.5 text-accent" />
            {t.hero.locationLabel}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
            {translation.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${resume.personal.email}`}
              className={buttonStyles({ size: "md" })}
            >
              <MailIcon className="h-4 w-4" />
              {t.hero.ctaContact}
            </a>
            <ExternalLink
              href={siteConfig.github}
              className={buttonStyles({ variant: "secondary", size: "md" })}
            >
              <GithubIcon className="h-4 w-4" />
              {t.hero.ctaGithub}
            </ExternalLink>
            <ExternalLink
              href={siteConfig.linkedin}
              className={buttonStyles({ variant: "ghost", size: "md" })}
            >
              <LinkedinIcon className="h-4 w-4" />
              {t.hero.ctaLinkedin}
            </ExternalLink>
          </div>

          <div className="mt-7 flex flex-col gap-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {t.hero.cvLabel}
            </span>
            <CvLinks />
          </div>

          <a
            href="#about"
            className="mt-10 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
          >
            {t.hero.scroll}
            <ArrowDownIcon className="h-3.5 w-3.5" />
          </a>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-sm">
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-4xl border border-accent/30"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-4xl border border-border bg-surface shadow-card">
              <div className="relative aspect-square">
                <Image
                  src={asset(resume.personal.photo)}
                  alt={t.a11y.photoAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 384px, 80vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-white backdrop-blur-md">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/60">
                    {t.about.facts.experience}
                  </p>
                  <p className="font-display text-sm font-semibold">
                    {t.about.facts.experienceValue}
                  </p>
                </div>
                <div className="h-8 w-px bg-white/20" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/60">
                    {t.about.facts.location}
                  </p>
                  <p className="font-display text-sm font-semibold">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
