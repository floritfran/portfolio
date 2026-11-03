"use client";

import { useEffect, useRef, useState } from "react";

import {
  ArrowRightIcon,
  CloseIcon,
  MailIcon,
  MenuIcon,
} from "@/components/icons";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CvLinks } from "@/components/ui/CvLinks";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/data/site";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";
import { useScrolled } from "@/lib/useScrolled";

const NAV_ITEMS = [
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "experience", key: "experience" },
  { id: "projects", key: "projects" },
  { id: "contact", key: "contact" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Header() {
  const { t } = useI18n();
  const active = useActiveSection(SECTION_IDS);
  const scrolled = useScrolled();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      setMenuOpen(true);
    }
  };

  const closeMenu = () => {
    dialogRef.current?.close();
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    label: t.nav[item.key],
  }));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border/80 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-background/0",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label={`${siteConfig.name} — ${t.nav.home}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface font-display text-sm font-bold text-accent transition-colors group-hover:border-accent/50">
            FF
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-semibold">
              {siteConfig.name}
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
              {t.hero.eyebrow}
            </span>
          </span>
        </a>

        <nav
          aria-label={t.nav.primary}
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "relative rounded-full px-3 py-2 text-sm transition-colors",
                active === item.id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity",
                  active === item.id ? "opacity-100" : "opacity-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden md:inline-flex" />
          <ThemeToggle />
          <a
            href="#contact"
            className={cn(
              buttonStyles({ variant: "secondary", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            {t.nav.cv}
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-foreground lg:hidden"
          >
            <MenuIcon className="h-4 w-4" />
          </button>
        </div>
      </Container>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        onClose={() => setMenuOpen(false)}
        onCancel={() => setMenuOpen(false)}
        aria-labelledby="mobile-menu-title"
        className="m-0 h-full max-h-none w-full max-w-none border-0 bg-background p-0 text-foreground backdrop:bg-black/60 open:flex open:flex-col lg:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5 sm:h-20 sm:px-8">
          <a
            href="#top"
            onClick={closeMenu}
            className="flex items-center gap-3"
            aria-label={`${siteConfig.name} — ${t.nav.home}`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface font-display text-sm font-bold text-accent">
              FF
            </span>
            <span className="font-display text-sm font-semibold">
              {siteConfig.name}
            </span>
          </a>
          <button
            type="button"
            onClick={closeMenu}
            aria-label={t.nav.close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-8 sm:px-8">
          <h2 id="mobile-menu-title" className="sr-only">
            {t.nav.primary}
          </h2>
          <nav aria-label={t.nav.primary} className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                className="group flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl font-medium">
                  {item.label}
                </span>
                <ArrowRightIcon className="ml-auto h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-6 pt-10">
            <div className="flex items-center justify-between gap-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <CvLinks />
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <MailIcon className="h-4 w-4 text-accent" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
