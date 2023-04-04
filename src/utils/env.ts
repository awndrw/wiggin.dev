import { z } from "zod";

const EnvSchema = z.enum(["development", "preview", "production"]);

export const env = EnvSchema.parse(
  process.env.VERCEL_ENV ??
    process.env.NEXT_PUBLIC_VERCEL_ENV ??
    process.env.NODE_ENV
);
