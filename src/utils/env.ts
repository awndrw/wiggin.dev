export const env =
  process.env.VERCEL_ENV ??
  process.env.NEXT_PUBLIC_VERCEL_ENV ??
  process.env.NODE_ENV;
