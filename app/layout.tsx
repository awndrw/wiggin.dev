import { Partytown } from "@builder.io/partytown/react";
import { cookies as nextCookies } from "next/headers";
import Script from "next/script";
import React from "react";

import { ActionBar } from "components/ActionBar";
import { Analytics } from "components/Analytics";
import { ReactWrapProvider } from "components/external/ReactWrapProvider";
import { Provider as TooltipProvider } from "components/external/radix/Tooltip";
import { env } from "constants/env";
import { url } from "constants/url";
import { StorageKey } from "store/constants";
import { createStyles } from "theme";
import { DEFAULT_MODE } from "theme/constants";
import { hueId, getHexForColor } from "theme/utils";
import { getId } from "utils/getId";
import { getServerHue } from "utils/getServerHue";

import "./globals.scss";

export const metadata = {
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
  const isAndrew = Boolean(cookies.get(StorageKey.IS_ANDREW)?.value);

  return (
    <html lang="en">
      <head>
        <Partytown debug={!env.isProduction} forward={["dataLayer.push"]} />
        <Script
          id={getId()}
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html:
              "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NM2JLN5');",
          }}
        />
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NM2JLN5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <TooltipProvider>
          <ReactWrapProvider>{children}</ReactWrapProvider>
        </TooltipProvider>
        <ActionBar />
        {!isAndrew && <Analytics />}
      </body>
    </html>
  );
}
