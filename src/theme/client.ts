import better from "better-color-tools";
import "client-only";

import { type Hue, HueSchema, ModeSchema } from "./constants";
import { isHue } from "./shared";

export function updateThemeColor() {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const accentColor = getComputedStyle(document.body).accentColor;
  if (!accentColor) return;
  const activeColor = better.from(accentColor).hex;
  themeColor?.setAttribute("content", activeColor);
}

export function getHue(element: Element) {
  const hueAttr = element.getAttribute("data-hue");
  if (!hueAttr) return null;
  const parsedHue = HueSchema.safeParse(parseInt(hueAttr));
  return parsedHue.success ? parsedHue.data : null;
}

export function getMode() {
  const modeAttr = document.body.getAttribute("data-mode");
  if (!modeAttr) return null;
  const parsedMode = ModeSchema.safeParse(modeAttr);
  return parsedMode.success ? parsedMode.data : null;
}

export function getAvailableHues() {
  const hues: Hue[] = [];
  document.querySelectorAll("style[id^=hue-]").forEach((el) => {
    const hue = parseInt(el.id.replace("hue-", ""));
    if (isHue(hue)) {
      hues.push(hue);
    }
  });
  return hues;
}
