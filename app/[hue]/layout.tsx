import React from "react";

import { Analytics } from "components/Analytics";
import { ReactWrapProvider } from "components/external/ReactWrapProvider";
import { Provider as TooltipProvider } from "components/external/radix/Tooltip";
import { createStyles } from "theme";
import { DEFAULT_MODE, getPresetHues, parseHue } from "theme/constants";
import { hueId, getHexForColor } from "theme/utils";

import { ActionBar } from "./ActionBar";

export function generateStaticParams() {
  return [...Array(360).keys()].map((hue) => ({ hue: hue.toString() }));
}

export default async function Layout({
  children,
  params: { hue: hueParam },
}: {
  children: React.ReactNode;
  params: { hue: string };
}) {
  const hue = parseHue(hueParam);
  const presetHues = getPresetHues(hue);

  return (
    <html lang="en">
      <head>
        {presetHues.map((hue) => (
          <style
            id={hueId(hue)}
            key={hue}
            dangerouslySetInnerHTML={{ __html: createStyles(hue) }}
          />
        ))}
        <meta
          name="theme-color"
          content={getHexForColor(hue, DEFAULT_MODE, "primary")}
        />
      </head>
      <body data-hue={hue}>
        <TooltipProvider>
          <ReactWrapProvider>{children}</ReactWrapProvider>
        </TooltipProvider>
        <ActionBar presetHues={presetHues} />
        <Analytics />
      </body>
    </html>
  );
}
