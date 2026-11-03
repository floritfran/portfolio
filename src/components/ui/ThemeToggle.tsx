"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t.theme.toggle}
      title={t.theme.toggle}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-foreground",
        className,
      )}
    >
      <SunIcon className="hidden h-4 w-4 dark:block" />
      <MoonIcon className="h-4 w-4 dark:hidden" />
    </button>
  );
}
