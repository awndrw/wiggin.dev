import { type Color, type Hue, type Mode } from "theme/constants";
import { lightnessAndChromaValues } from "theme/oklch";
import { oklch } from "theme/utils";

export function createCSSVars(hue: Hue, mode: Mode) {
  const map = Object.entries(lightnessAndChromaValues[mode]).reduce(
    (entries, [name, [lightness, chroma]]) => {
      entries[name as Color] = oklch(lightness, chroma, hue);
      return entries;
    },
    {} as Record<Color, string>
  );
  return Object.entries(map)
    .map(([name, color]) => `--color-accent-${name}: ${color};`)
    .join("");
}
