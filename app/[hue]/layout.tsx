import React from "react";

import { ActionBar } from "components/ActionBar";
import { Analytics } from "components/Analytics";
import { ReactWrapProvider } from "components/external/ReactWrapProvider";
import { Provider as TooltipProvider } from "components/external/radix/Tooltip";
import { createStyles } from "theme";
import { DEFAULT_MODE, parseHue, type Hue, HueSchema } from "theme/constants";
import { hueId, getHexForColor } from "theme/utils";

export function generateStaticParams() {
  return [...Array(360).keys()].map((hue) => ({ hue: hue.toString() }));
}

function getHues(hue: Hue) {
  if (hue <= 120) {
    return [hue, HueSchema.parse(hue + 120), HueSchema.parse(hue + 240)];
  }
  if (hue <= 240) {
    return [HueSchema.parse(hue - 120), hue, HueSchema.parse(hue + 120)];
  }
  return [HueSchema.parse(hue - 240), HueSchema.parse(hue - 120), hue];
}

export default async function Layout({
  children,
  params: { hue: hueParam },
}: {
  children: React.ReactNode;
  params: { hue: string };
}) {
  const hue = parseHue(hueParam);
  const hues = getHues(hue);

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
        <ActionBar hues={hues} />
        <Analytics />
      </body>
    </html>
  );
}
