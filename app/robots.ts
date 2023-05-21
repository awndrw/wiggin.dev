import { type MetadataRoute } from "next";

import { env } from "constants/env";
import { url } from "constants/url";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: env.isProduction ? "" : "/",
      },
    ],
    sitemap: new URL("/sitemap.xml", url).href,
  };
}
