"use client";

import type { ReactNode } from "react";

import { ArrowUpRightIcon } from "@/components/icons";
import { useI18n } from "@/i18n/I18nProvider";

export function ExternalLink({
  href,
  children,
  className,
  showIcon = false,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  ariaLabel?: string;
}) {
  const { t } = useI18n();
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
      {showIcon ? (
        <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
      ) : null}
      {isExternal ? (
        <span className="sr-only"> ({t.a11y.opensInNewTab})</span>
      ) : null}
    </a>
  );
}
