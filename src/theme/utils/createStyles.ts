import postcssOklabFunction from "@csstools/postcss-oklab-function";
import postcss from "postcss";
// @ts-expect-error Untyped module
import postcssMinify from "postcss-minify";

import { type Hue } from "theme/constants";
import { createCSSVars } from "theme/utils";
import { warnOnClient } from "utils/warnOnClient";

export function createStyles(hue: Hue) {
  warnOnClient();

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
