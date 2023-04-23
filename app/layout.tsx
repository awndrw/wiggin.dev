import { cookies as nextCookies } from "next/headers";
import React from "react";

import { ActionBar } from "components/ActionBar";
import { Analytics } from "components/Analytics";
import { ReactWrapProvider } from "components/external/ReactWrapProvider";
import { Provider as TooltipProvider } from "components/external/radix/Tooltip";
import { host, url } from "constants/url";
import { createStyles } from "theme";
import { DEFAULT_MODE } from "theme/constants";
import { hueId, getHexForColor } from "theme/utils";
import { getServerHue } from "utils/getServerHue";

import "./globals.scss";

export const metadata = {
  title: {
    default: host,
    template: `${host}/%s`,
  },
  description:
    "Andrew Wiggin is a brooklyn based design engineer passionate about design systems, motion design and accessibility.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  metadataBase: url,
  openGraph: {
    type: "website",
    title: "Andrew Wiggin",
    description: "",
  },
  twitter: {
    card: "summary",
    site: "@wiggindev",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = nextCookies();
  const hue = getServerHue(cookies);

  return (
    <html lang="en">
      <head>
        <style
          id={hueId(hue)}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: createStyles(hue) }}
        />
        <meta
          name="theme-color"
          content={getHexForColor(hue, DEFAULT_MODE, "primary")}
        />
      </head>
      <body data-hue={hue}>
        <TooltipProvider>
          <ReactWrapProvider>{children}</ReactWrapProvider>
        </TooltipProvider>
        <ActionBar />
        <Analytics />
      </body>
    </html>
  );
}
