import { type MetadataRoute } from "next/dist/lib/metadata/types/metadata-interface";

import { env } from "utils/env";

const url = process.env.VERCEL_URL || "wiggin.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: !env.isProduction ? "/" : "",
      },
    ],
    sitemap: `https://${url}/sitemap.xml`,
    host: `https://${url}`,
  };
}
