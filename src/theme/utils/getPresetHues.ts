import { type Hue, HueSchema } from "theme/constants";

export function getPresetHues(baseHue: Hue) {
  return [
    baseHue,
    HueSchema.parse((baseHue + 120) % 360),
    HueSchema.parse((baseHue + 240) % 360),
  ];
}
