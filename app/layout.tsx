import { Provider as TooltipProvider } from "client/radix/Tooltip";
import { ActionBar } from "client/ActionBar";
import { Analytics } from "components/Analytics";
import { ReactWrapProvider } from "client/ReactWrapProvider";
import { hyenaSunrise } from "fonts/hyena";
import { type Metadata } from "next";
import { getCookie } from "cookies-next";
import React from "react";
import { createStyles, getStyle } from "utils/theme/style";
import { DEFAULT_HUE, DEFAULT_MODE, HueSchema } from "utils/theme/color";

import "./globals.scss";

export const metadata: Metadata = {
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
  const hueCookie = getCookie("hue");
  const hueString = typeof hueCookie !== "string" ? "" : hueCookie;
  const parsedHue = hueCookie ? HueSchema.safeParse(parseInt(hueString)) : null;
  const hue = parsedHue?.success ? parsedHue.data : DEFAULT_HUE;

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
        <TooltipProvider>
          <ReactWrapProvider>{children}</ReactWrapProvider>
        </TooltipProvider>
        <ActionBar />
        <Analytics />
      </body>
    </html>
  );
}
