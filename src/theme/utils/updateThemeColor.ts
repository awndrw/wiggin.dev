import better from "better-color-tools";

import { warnOnClient } from "utils/warnOnClient";

export function updateThemeColor() {
  warnOnClient();

  const themeColor = document.querySelector('meta[name="theme-color"]');
  const accentColor = getComputedStyle(document.body).accentColor;
  if (!accentColor) return;
  const activeColor = better.from(accentColor).hex;
  themeColor?.setAttribute("content", activeColor);
}
