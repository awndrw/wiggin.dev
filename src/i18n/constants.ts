import { z } from "zod";

export const LocaleSchema = z.enum(["en", "es"] as const);
export type Locale = z.infer<typeof LocaleSchema>;
export const LOCALES = LocaleSchema.options;
export const DEFAULT_LOCALE = LOCALES[0];
