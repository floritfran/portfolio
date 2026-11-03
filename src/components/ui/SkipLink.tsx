"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-contrast"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
