import { env } from "constants/env";

const PRODUCTION_HOST = "wiggin.dev";
const PREPROD_HOST = "dev.wiggin.dev";
const PREVIEW_HOST =
  process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || PREPROD_HOST;
const DEVELOPMENT_HOST = "localhost:3000";

export const host = env.isProduction
  ? PRODUCTION_HOST
  : env.isPreprod
  ? PREPROD_HOST
  : env.isPreview
  ? PREVIEW_HOST
  : DEVELOPMENT_HOST;

const protocol = env.isDevelopment ? "http://" : "https://";
export const url = new URL(protocol + host);
