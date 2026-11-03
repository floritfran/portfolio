import { z } from "zod";

export const localeSchema = z.enum(["es", "en"]);

export const localizedTextSchema = z
  .object({
    es: z.string().min(1),
    en: z.string().min(1),
  })
  .strict();

const localizedListSchema = z
  .object({
    es: z.array(z.string().min(1)).min(1),
    en: z.array(z.string().min(1)).min(1),
  })
  .strict();

const yearSchema = z.string().regex(/^\d{4}$/);
const monthSchema = z.string().regex(/^\d{4}-\d{2}$/);

export const personalSchema = z
  .object({
    name: z.string().min(1),
    title: localizedTextSchema,
    location: localizedTextSchema,
    email: z.email(),
    photo: z.string().min(1),
    links: z
      .object({
        github: z.url(),
        linkedin: z.url(),
        portfolio: z.url(),
      })
      .strict(),
  })
  .strict();

export const experienceSchema = z
  .object({
    id: z.string().min(1),
    company: z.string().min(1),
    role: localizedTextSchema,
    start: monthSchema,
    end: monthSchema.nullable(),
    cvOnly: z
      .object({
        client: z.string().min(1),
        project: z.string().min(1),
      })
      .strict()
      .optional(),
    description: localizedTextSchema,
    bullets: localizedListSchema,
    tech: z.array(z.string().min(1)).min(1),
  })
  .strict();

export const educationSchema = z
  .object({
    id: z.string().min(1),
    institution: z.string().min(1),
    start: yearSchema.nullable(),
    end: yearSchema.nullable(),
    degree: localizedTextSchema,
    details: localizedTextSchema.optional(),
    location: z.string().optional(),
    showOnWebsite: z.boolean().optional(),
  })
  .strict();

export const skillCategorySchema = z
  .object({
    id: z.string().min(1),
    label: localizedTextSchema,
    items: z.array(z.string().min(1)).min(1),
  })
  .strict();

export const languageSchema = z
  .object({
    name: localizedTextSchema,
    level: localizedTextSchema,
    note: localizedTextSchema,
  })
  .strict();

export const translationsSchema = z
  .object({
    title: z.string().min(1),
    summary: z.string().min(1),
    about: z
      .object({
        intro: z.string().min(1),
        paragraphs: z.array(z.string().min(1)).min(1),
        principles: z.array(z.string().min(1)).min(3),
      })
      .strict(),
    present: z.string().min(1),
  })
  .strict();

export const resumeSchema = z
  .object({
    personal: personalSchema,
    experience: z.array(experienceSchema).min(1),
    education: z.array(educationSchema).min(1),
    skills: z.array(skillCategorySchema).min(1),
    languages: z.array(languageSchema).min(1),
    translations: z
      .object({
        es: translationsSchema,
        en: translationsSchema,
      })
      .strict(),
  })
  .strict();

const projectTranslationSchema = z
  .object({
    tagline: z.string().min(1),
    problem: z.string().min(1),
    features: z.array(z.string().min(1)).min(1),
    role: z.string().min(1),
    challenge: z.string().min(1),
  })
  .strict();

export const projectSchema = z
  .object({
    slug: z.string().min(1),
    name: z.string().min(1),
    type: z.enum(["personal", "academic"]),
    featured: z.boolean(),
    repo: z.url(),
    demo: z.url().nullable(),
    apk: z.url().nullable(),
    image: z.string().nullable(),
    stack: z.array(z.string().min(1)).min(1),
    translations: z
      .object({
        es: projectTranslationSchema,
        en: projectTranslationSchema,
      })
      .strict(),
  })
  .strict();

export const projectsSchema = z.array(projectSchema).min(1);

export type Locale = z.infer<typeof localeSchema>;
export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type Personal = z.infer<typeof personalSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type Language = z.infer<typeof languageSchema>;
export type ResumeTranslations = z.infer<typeof translationsSchema>;
export type Resume = z.infer<typeof resumeSchema>;
export type Project = z.infer<typeof projectSchema>;
