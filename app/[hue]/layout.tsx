import { type Metadata } from "next";
import Script from "next/script";
import { type ReactNode } from "react";

import { Provider as TooltipProvider } from "components/external/radix/Tooltip";
import { DEFAULT_MODE } from "theme/constants";
import { createStyles, getHexForColor } from "theme/server";
import { hueId, getPresetHues, parseHue } from "theme/shared";
import { getId } from "utils/getId";

import { ActionBar } from "./LayoutComponents/ActionBar";
import { Analytics } from "./LayoutComponents/Analytics";

export function generateStaticParams() {
  return [...Array(360).keys()].map((hue) => ({ hue: hue.toString() }));
}

export function generateMetadata({
  params: { hue: hueParam },
}: {
  params: { hue: string };
}): Metadata {
  const hue = parseHue(hueParam);

  return {
    themeColor: getHexForColor(hue, DEFAULT_MODE, "primary"),
  };
}

export default async function Layout({
  children,
  params: { hue: hueParam },
}: {
  children: ReactNode;
  params: { hue: string };
}) {
  const hue = parseHue(hueParam);
  const presetHues = getPresetHues(hue);

  return (
    <html lang="en">
      <head>
        <Script
          id={getId()}
          strategy="worker"
          data-partytown-config={{ forward: ["dataLayer.push"] }}
        >
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NM2JLN5');`}
        </Script>
        {presetHues.map((hue) => (
          <style
            id={hueId(hue)}
            key={hue}
            dangerouslySetInnerHTML={{ __html: createStyles(hue) }}
          />
        ))}
      </head>
      <body data-hue={hue}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NM2JLN5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <TooltipProvider>{children}</TooltipProvider>
        <ActionBar presetHues={presetHues} />
        <Analytics />
      </body>
    </html>
  );
}
