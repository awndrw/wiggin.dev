import better from "better-color-tools";
import { createStyles } from "theme/index";

import { type Hue, type Mode, type Color, HueSchema } from "./constants";
import { lightnessAndChromaValues } from "./oklch";

export const hueId = (hue: number) => `hue-${hue}`;

export const oklch = (lightness: number, chroma: number, hue: Hue) =>
  `oklch(${lightness} ${chroma} ${hue})`;

export function getHexForColor(hue: Hue, mode: Mode, color: Color) {
  const [lightness, chroma] = lightnessAndChromaValues[mode][color];
  return better.from(oklch(lightness, chroma, hue)).hex;
}

export function createHueStyle(hue: Hue) {
  const styleEl = document.createElement("style");
  styleEl.id = hueId(hue);
  styleEl.innerHTML = createStyles(hue);
  document.head.appendChild(styleEl);
}

export function getHue(element: Element) {
  const hueAttr = element.getAttribute("data-hue");
  if (!hueAttr) return null;
  const parsedHue = HueSchema.safeParse(parseInt(hueAttr));
  return parsedHue.success ? parsedHue.data : null;
}

export function recolor() {
  document.querySelectorAll("[data-hue]").forEach((element) => {
    const hue = getHue(element);
    const hueStyleExists = hue && document.getElementById(hueId(hue)) !== null;
    if (hue === null || hueStyleExists) return;
    createHueStyle(hue);
  });
}
