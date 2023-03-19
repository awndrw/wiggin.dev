import better from "better-color-tools";
import postcss from "postcss";
import postcssOklabFunction from "@csstools/postcss-oklab-function";
// @ts-expect-error untyped module
import postcssMinify from "postcss-minify";
import { mutate } from "utils/mutate";
import { type Hue, type Mode, type Color } from "./constants";
import { lightnessAndChromaValues } from "./oklch";

export const oklch = (lightness: number, chroma: number, hue: Hue) =>
  `oklch(${lightness} ${chroma} ${hue})`;

const createCSSVars = (hue: Hue, mode: Mode) => {
  const map = mutate(lightnessAndChromaValues[mode], ([lightness, chroma]) =>
    oklch(lightness, chroma, hue)
  );
  let vars = Object.entries(map)
    .map(([name, color]) => `--color-accent-${name}: ${color};`)
    .join("");
  vars += `accent-color: var(--color-accent-primary);`;
  return vars;
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

export const getHexForColor = (hue: Hue, mode: Mode, color: Color) => {
  const [lightness, chroma] = lightnessAndChromaValues[mode][color];
  return better.from(oklch(lightness, chroma, hue)).hex;
};

export const updateThemeColor = () => {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const accentColor = getComputedStyle(document.body).accentColor;
  if (!accentColor) return;
  const activeColor = better.from(accentColor).hex;
  themeColor?.setAttribute("content", activeColor);
};
