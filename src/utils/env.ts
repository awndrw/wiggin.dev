import { z } from "zod";

export const envSchema = z.object({
  VERCEL_ENV: z.enum(["development", "preview", "production"]),
});

export const env = envSchema.parse(process.env);
