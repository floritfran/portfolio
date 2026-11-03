"use client";

import { DownloadIcon } from "@/components/icons";
import { CV_FILES } from "@/data/cv";
import { asset } from "@/data/site";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";
import { buttonStyles } from "./Button";

export function CvLinks({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        href={asset(CV_FILES.es)}
        download
        className={buttonStyles({ variant: "secondary", size: "sm" })}
      >
        <DownloadIcon className="h-4 w-4" />
        CV ES
        <span className="sr-only"> — {t.hero.cvEs}</span>
      </a>
      <a
        href={asset(CV_FILES.en)}
        download
        className={buttonStyles({ variant: "secondary", size: "sm" })}
      >
        <DownloadIcon className="h-4 w-4" />
        CV EN
        <span className="sr-only"> — {t.hero.cvEn}</span>
      </a>
    </div>
  );
}
