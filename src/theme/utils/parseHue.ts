import { type Hue, HueSchema } from "theme/constants";
import { getRandomHue } from "theme/utils";

export function parseHue(hue: unknown, fallback?: Hue): Hue {
  const parsedHue = HueSchema.safeParse(hue);
  return parsedHue.success ? parsedHue.data : fallback ?? getRandomHue();
}
