import { mutate } from "utils/mutate";

import { type Hue, HueSchema, type Mode } from "./constants";
import { lightnessAndChromaValues } from "./oklch";

export function isHue(hue: unknown): hue is Hue {
  return HueSchema.safeParse(hue).success;
}

export function parseHue(hue: unknown, fallback?: Hue): Hue {
  const parsedHue = HueSchema.safeParse(hue);
  return parsedHue.success ? parsedHue.data : fallback ?? getRandomHue();
}

export function getRandomHue() {
  return HueSchema.parse(Math.floor(Math.random() * 360));
}

export function getPresetHues(baseHue: Hue) {
  return [
    baseHue,
    HueSchema.parse((baseHue + 120) % 360),
    HueSchema.parse((baseHue + 240) % 360),
  ];
}

export const hueId = (hue: number) => `hue-${hue}`;

export const oklch = (lightness: number, chroma: number, hue: Hue) =>
  `oklch(${lightness} ${chroma} ${hue})`;

export const createCSSVars = (hue: Hue, mode: Mode) => {
  const map = mutate(lightnessAndChromaValues[mode], ([lightness, chroma]) =>
    oklch(lightness, chroma, hue)
  );
  return Object.entries(map)
    .map(([name, color]) => `--color-accent-${name}: ${color};`)
    .join("");
};
