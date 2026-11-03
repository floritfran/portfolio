import { cn } from "@/lib/cn";

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
        <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted text-pretty sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
