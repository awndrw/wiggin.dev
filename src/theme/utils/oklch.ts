import { type Hue } from "theme/constants";

export const oklch = (lightness: number, chroma: number, hue: Hue) =>
  `oklch(${lightness} ${chroma} ${hue})`;
