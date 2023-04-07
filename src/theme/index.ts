import postcssOklabFunction from "@csstools/postcss-oklab-function";
import better from "better-color-tools";
import postcss from "postcss";
// @ts-expect-error Untyped module
import postcssMinify from "postcss-minify";

import { mutate } from "utils/mutate";

import { type Hue, type Mode } from "./constants";
import { lightnessAndChromaValues } from "./oklch";
import { oklch } from "./utils";

const createCSSVars = (hue: Hue, mode: Mode) => {
  const map = mutate(lightnessAndChromaValues[mode], ([lightness, chroma]) =>
    oklch(lightness, chroma, hue)
  );
  return Object.entries(map)
    .map(([name, color]) => `--color-accent-${name}: ${color};`)
    .join("");
};

export const createStyles = (hue: Hue) => {
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
};

export const updateThemeColor = () => {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const accentColor = getComputedStyle(document.body).accentColor;
  if (!accentColor) return;
  const activeColor = better.from(accentColor).hex;
  themeColor?.setAttribute("content", activeColor);
};
