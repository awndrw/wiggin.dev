import { Provider as TooltipProvider } from "client/radix/Tooltip";
import { Analytics } from "client/Analytics";
import { hyenaSunrise } from "fonts/hyena";
import { cookies as nextCookies } from "next/headers";
import React from "react";
import { ReactWrapProvider } from "client/ReactWrapProvider";
import { createStyles } from "utils/theme/style";
import { env } from "utils/env";
import { HueSchema } from "utils/theme/color";
import { ActionBar } from "client/ActionBar";
import { HueProvider } from "theme/Hue";
import { ModeProvider } from "theme/Mode";

import "./globals.scss";

export const metadata = {
  title: {
    default: "wiggin.dev",
    template: "wiggin.dev/%s",
  },
  icons: {
    icon: [
      { url: "/icons/blue_32.png", sizes: "any" },
      { url: "/icons/blue.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/blue_180.png",
  },
  manifest: "/manifest.webmanifest",
  themeColor: "rgb(0, 128, 184)",
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
          id="hue-server"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: createStyles(hue) }}
        />
      </head>
      <body className={hyenaSunrise.className} data-hue={hue}>
        <HueProvider initialHue={hue}>
          <ModeProvider>
            <TooltipProvider>
              <ReactWrapProvider>{children}</ReactWrapProvider>
            </TooltipProvider>
            <ActionBar />
          </ModeProvider>
        </HueProvider>
        <Analytics mode={analyticsMode} />
      </body>
    </html>
  );
}
