import better from "better-color-tools";

import { type Color, type Hue, type Mode } from "theme/constants";
import { lightnessAndChromaValues } from "theme/oklch";
import { oklch } from "theme/utils";

export function getHexForColor(hue: Hue, mode: Mode, color: Color) {
  const [lightness, chroma] = lightnessAndChromaValues[mode][color];
  return better.from(oklch(lightness, chroma, hue)).hex;
}
