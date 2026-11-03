import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeTone = "default" | "accent" | "muted";

const tones: Record<BadgeTone, string> = {
  default: "border-border bg-surface text-muted",
  accent: "border-accent/30 bg-accent/10 text-accent",
  muted: "border-transparent bg-surface-raised text-muted",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
