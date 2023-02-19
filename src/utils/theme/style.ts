import postcss from "postcss";
import postcssOklabFunction from "@csstools/postcss-oklab-function";
// @ts-ignore untyped module
import postcssMinify from "postcss-minify";
import { Hue, Mode, Color } from "./color";
import { oklch } from "./oklch";

const createHueModeMap = (hue: Hue, mode: Mode) => {
  const map = oklch[mode];
  const res = {} as Record<Color, string>;
  Object.entries(map).forEach(([name, lightnessAndChroma]) => {
    res[name as keyof typeof res] = `oklch(${lightnessAndChroma} ${hue})`;
  });
  return res;
};

const createStyles = (map: Record<Color, string>) =>
  Object.entries(map)
    .map(([name, color]) => `--color-accent-${name}: ${color};`)
    .join("");

export const createHueStyles = (hue: Hue) => {
  const lightStyles = createStyles(createHueModeMap(hue, "light"));
  const darkStyles = createStyles(createHueModeMap(hue, "dark"));
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
