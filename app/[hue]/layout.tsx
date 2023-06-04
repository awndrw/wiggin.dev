import { type Metadata } from "next";
import Script from "next/script";
import { type ReactNode } from "react";

import { DEFAULT_MODE } from "theme/constants";
import {
  hueId,
  getPresetHues,
  parseHue,
  createStyles,
  getHexForColor,
} from "theme/utils";
import { getId } from "utils/getId";

import { ActionBar } from "./components/ActionBar";
import { Analytics } from "./components/Analytics";

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
  const presetHueStyles: Record<string, string> = {};
  for (const presetHue of presetHues) {
    presetHueStyles[hueId(presetHue)] = await createStyles(presetHue);
  }

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
        {Object.entries(presetHueStyles).map(([id, style]) => (
          <style id={id} key={id} dangerouslySetInnerHTML={{ __html: style }} />
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
        {children}
        <ActionBar presetHues={presetHues} />
        <Analytics />
      </body>
    </html>
  );
}
