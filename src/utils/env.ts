import { z } from "zod";

export const envSchema = z.object({
  VERCEL_ENV: z.enum(["development", "preview", "production"]),
  DATOCMS_READONLY_TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);
