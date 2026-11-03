import type { Locale } from "@/data/resume.schema";

function parseMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

export function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
) {
  const formatter = new Intl.DateTimeFormat(
    locale === "es" ? "es-AR" : "en-US",
    {
      month: "short",
      year: "numeric",
    },
  );

  const startLabel = formatter.format(parseMonth(start));
  const endLabel = end ? formatter.format(parseMonth(end)) : presentLabel;

  return `${startLabel} — ${endLabel}`;
}
