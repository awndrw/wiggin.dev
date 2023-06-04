import { type Hue } from "theme/constants";
import { createCSSVars } from "theme/utils";
import { warnOnClient } from "utils/warnOnClient";

export async function createStyles(hue: Hue) {
  warnOnClient("postcss", "@csstools/postcss-oklab-function", "postcss-minify");

  const [
    { default: postcss },
    { default: postcssOklabFunction },
    { default: postcssMinify },
  ] = await Promise.all([
    import("postcss"),
    import("@csstools/postcss-oklab-function"),
    // @ts-expect-error Untyped package
    import("postcss-minify"),
  ]);

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
