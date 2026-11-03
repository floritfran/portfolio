"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface p-0.5",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("es")}
        aria-pressed={locale === "es"}
        aria-label={t.language.es}
        className={cn(
          "rounded-full px-2.5 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-colors",
          locale === "es"
            ? "bg-accent text-accent-contrast"
            : "text-muted hover:text-foreground",
        )}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        aria-label={t.language.en}
        className={cn(
          "rounded-full px-2.5 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-colors",
          locale === "en"
            ? "bg-accent text-accent-contrast"
            : "text-muted hover:text-foreground",
        )}
      >
        EN
      </button>
    </div>
  );
}
