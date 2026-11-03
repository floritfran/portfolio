"use client";

import {
  ArrowUpIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { siteConfig } from "@/data/site";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "experience", key: "experience" },
  { id: "projects", key: "projects" },
  { id: "contact", key: "contact" },
] as const;

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface font-display text-sm font-bold text-accent">
                FF
              </span>
              <span className="font-display text-sm font-semibold">
                {siteConfig.name}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t.footer.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <MailIcon className="h-4 w-4 text-accent" />
              {siteConfig.email}
            </a>
          </div>

          <div>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {t.footer.navigation}
            </h2>
            <nav aria-label={t.footer.navigation} className="mt-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="w-fit text-sm text-muted transition-colors hover:text-foreground"
                >
                  {t.nav[item.key]}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {t.contact.eyebrow}
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              <ExternalLink
                href={siteConfig.github}
                className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </ExternalLink>
              <ExternalLink
                href={siteConfig.linkedin}
                className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </ExternalLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/70 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <p>{t.footer.builtWith}</p>
            <a
              href="#top"
              className={cn(
                "inline-flex items-center gap-1.5 transition-colors hover:text-foreground",
              )}
            >
              {t.footer.backToTop}
              <ArrowUpIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
