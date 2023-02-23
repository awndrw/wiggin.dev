import { Analytics } from "client/Analytics";
import { hyenaSunrise } from "fonts/hyena";
import { cookies as nextCookies } from "next/headers";
import React from "react";
import { Providers } from "store/Providers";
import { createStyles, getStyle } from "utils/theme/style";
import { env } from "utils/env";
import { DEFAULT_MODE, HueSchema } from "utils/theme/color";

import "./globals.scss";

export const metadata = {
  title: {
    default: "wiggin.dev",
    template: "wiggin.dev/%s",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = nextCookies();
  const hueCookie = cookies.get("hue")?.value;
  const parsedHue = hueCookie ? HueSchema.safeParse(parseInt(hueCookie)) : null;
  const hue = parsedHue?.success ? parsedHue.data : 233;

  const analyticsMode =
    env.VERCEL_ENV === "production" ? "production" : "development";

  return (
    <html lang="en">
      <head>
        <style
          id={`hue-${hue}`}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: createStyles(hue) }}
        />
        <meta
          name="theme-color"
          content={getStyle(hue, DEFAULT_MODE, "primary")}
        />
      </head>
      <body className={hyenaSunrise.className} data-hue={hue}>
        <Providers initialHue={hue}>{children}</Providers>
        <Analytics mode={analyticsMode} />
      </body>
    </html>
  );
}
