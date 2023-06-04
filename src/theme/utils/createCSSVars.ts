import { type Hue, type Mode } from "theme/constants";
import { lightnessAndChromaValues } from "theme/oklch";
import { oklch } from "theme/utils";
import { mutate } from "utils/mutate";

export function createCSSVars(hue: Hue, mode: Mode) {
  const map = mutate(lightnessAndChromaValues[mode], ([lightness, chroma]) =>
    oklch(lightness, chroma, hue)
  );
  return Object.entries(map)
    .map(([name, color]) => `--color-accent-${name}: ${color};`)
    .join("");
}
