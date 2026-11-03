import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  id,
  labelledBy,
  children,
  className,
}: {
  id: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative border-t border-border/70 py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
