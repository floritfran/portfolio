"use client";

import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";
import { buttonStyles } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CV_FILES } from "@/data/cv";
import { asset, siteConfig } from "@/data/site";
import { useI18n } from "@/i18n/I18nProvider";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";

export function Contact() {
  const { t } = useI18n();
  const { copied, copy } = useCopyToClipboard();
  const email = siteConfig.email;

  return (
    <Section id="contact" labelledBy="contact-title">
      <Reveal>
        <SectionHeading
          id="contact-title"
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />
      </Reveal>

      <Reveal delay={60} className="mt-12">
        <div className="overflow-hidden rounded-4xl border border-border bg-surface shadow-card">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative p-7 sm:p-10 lg:p-12">
              <div
                className="pointer-events-none absolute inset-0 bg-grid opacity-40"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                  {t.contact.emailLabel}
                </p>
                <a
                  href={`mailto:${email}`}
                  className="mt-3 block break-all font-display text-2xl font-semibold tracking-tight transition-colors hover:text-accent sm:text-3xl"
                >
                  {email}
                </a>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${email}`}
                    className={buttonStyles({ size: "md" })}
                  >
                    <MailIcon className="h-4 w-4" />
                    {t.contact.emailCta}
                  </a>
                  <button
                    type="button"
                    onClick={() => copy(email)}
                    className={buttonStyles({ variant: "secondary", size: "md" })}
                  >
                    {copied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                    {copied ? t.contact.copied : t.contact.copyEmail}
                  </button>
                  <span role="status" aria-live="polite" className="sr-only">
                    {copied ? t.contact.copied : ""}
                  </span>
                </div>

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  <ExternalLink
                    href={siteConfig.linkedin}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-3 text-sm transition-colors hover:border-accent/40 hover:bg-surface"
                  >
                    <LinkedinIcon className="h-4 w-4 text-accent" />
                    {t.contact.linkedin}
                    <ArrowUpRightIcon className="ml-auto h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent" />
                  </ExternalLink>
                  <ExternalLink
                    href={siteConfig.github}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-3 text-sm transition-colors hover:border-accent/40 hover:bg-surface"
                  >
                    <GithubIcon className="h-4 w-4 text-accent" />
                    {t.contact.github}
                    <ArrowUpRightIcon className="ml-auto h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent" />
                  </ExternalLink>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-surface-raised/40 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                {t.contact.cvTitle}
              </h3>
              <div className="mt-4 space-y-3">
                <a
                  href={asset(CV_FILES.es)}
                  download
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-background"
                >
                  <span className="flex items-center gap-3">
                    <DownloadIcon className="h-4 w-4 text-accent" />
                    <span>
                      <span className="block text-sm font-medium">
                        {t.contact.cvEs}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                        PDF · ES
                      </span>
                    </span>
                  </span>
                  <ArrowUpRightIcon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                </a>
                <a
                  href={asset(CV_FILES.en)}
                  download
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-background"
                >
                  <span className="flex items-center gap-3">
                    <DownloadIcon className="h-4 w-4 text-accent" />
                    <span>
                      <span className="block text-sm font-medium">
                        {t.contact.cvEn}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                        PDF · EN
                      </span>
                    </span>
                  </span>
                  <ArrowUpRightIcon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                {t.contact.cvNote}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
