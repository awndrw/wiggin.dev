import better from "better-color-tools";
import postcss from "postcss";
import postcssOklabFunction from "@csstools/postcss-oklab-function";
// @ts-expect-error untyped module
import postcssMinify from "postcss-minify";
import { type Hue, type Mode, type Color } from "./constants";
import { oklch } from "./oklch";

const createHueModeMap = (hue: Hue, mode: Mode) => {
  const map = oklch[mode];
  const res = {} as Record<Color, string>;
  Object.entries(map).forEach(([name, lightnessAndChroma]) => {
    res[name as keyof typeof res] = `oklch(${lightnessAndChroma} ${hue})`;
  });
  return res;
};

const createCSSVars = (map: Record<Color, string>) => {
  let vars = Object.entries(map)
    .map(([name, color]) => `--color-accent-${name}: ${color};`)
    .join("");
  vars += `accent-color: var(--color-accent-primary);`;
  return vars;
};

export const createStyles = (hue: Hue) => {
  const lightStyles = createCSSVars(createHueModeMap(hue, "light"));
  const darkStyles = createCSSVars(createHueModeMap(hue, "dark"));
  const styles = `
  [data-hue="${hue}"] { ${lightStyles} }
  @media (prefers-color-scheme: dark) {
    [data-hue="${hue}"] { ${darkStyles} }
  }
  body[data-mode="light"][data-hue="${hue}"],
  body[data-mode="light"] [data-hue="${hue}"] { ${lightStyles} }
  body[data-mode="dark"][data-hue="${hue}"],
  body[data-mode="dark"] [data-hue="${hue}"] { ${darkStyles} }
  `;
  return postcss(postcssOklabFunction(), postcssMinify()).process(styles).css;
};

export const getStyle = (hue: Hue, mode: Mode, color: Color) => {
  const lightnessAndChroma = oklch[mode][color];
  return better.from(`oklch(${lightnessAndChroma} ${hue})`).hex;
};

export const updateThemeColor = () => {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const accentColor = getComputedStyle(document.body).accentColor;
  if (!accentColor) return;
  const activeColor = better.from(accentColor).hex;
  themeColor?.setAttribute("content", activeColor);
};
