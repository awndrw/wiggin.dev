import postcssOklabFunction from "@csstools/postcss-oklab-function";
import better from "better-color-tools";
import postcss from "postcss";
// @ts-expect-error Untyped module
import postcssMinify from "postcss-minify";
// import "server-only";

import { type Color, type Hue, type Mode } from "./constants";
import { lightnessAndChromaValues } from "./oklch";
import { createCSSVars, oklch } from "./shared";

export function createStyles(hue: Hue) {
  const lightStyles = createCSSVars(hue, "light");
  const darkStyles = createCSSVars(hue, "dark");
  const styles = `
  [data-hue="${hue}"] { ${lightStyles} }
  @media (prefers-color-scheme: dark) {
    [data-hue="${hue}"] { ${darkStyles} }
  }
  body[data-mode="light"][data-hue="${hue}"],
  body[data-mode="light"] [data-hue="${hue}"] { ${lightStyles} }
  body[data-mode="dark"][data-hue="${hue}"],
  body[data-mode="dark"] [data-hue="${hue}"] { ${darkStyles} }`;
  return postcss(postcssOklabFunction(), postcssMinify()).process(styles).css;
}

export function getHexForColor(hue: Hue, mode: Mode, color: Color) {
  const [lightness, chroma] = lightnessAndChromaValues[mode][color];
  return better.from(oklch(lightness, chroma, hue)).hex;
}
