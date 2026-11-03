import type { Locale, LocalizedText } from "@/data/resume.schema";

export function localized(text: LocalizedText, locale: Locale) {
  return text[locale];
}
