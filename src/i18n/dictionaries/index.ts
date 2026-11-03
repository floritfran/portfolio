import type { Locale } from "@/data/resume.schema";
import { en } from "./en";
import { es } from "./es";

export const dictionaries: Record<Locale, typeof es> = { es, en };
export type { Dictionary } from "./es";
