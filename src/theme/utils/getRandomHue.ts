import { HueSchema } from "theme/constants";

export function getRandomHue() {
  return HueSchema.parse(Math.floor(Math.random() * 360));
}
