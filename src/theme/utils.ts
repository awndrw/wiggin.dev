import better from "better-color-tools";

import { type Hue, type Mode, type Color } from "./constants";
import { lightnessAndChromaValues } from "./oklch";

export const oklch = (lightness: number, chroma: number, hue: Hue) =>
  `oklch(${lightness} ${chroma} ${hue})`;

export const getHexForColor = (hue: Hue, mode: Mode, color: Color) => {
  const [lightness, chroma] = lightnessAndChromaValues[mode][color];
  return better.from(oklch(lightness, chroma, hue)).hex;
};
