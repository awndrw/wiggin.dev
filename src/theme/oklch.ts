import { type Mode, type Color } from "theme/constants";

type LightnessAndChroma = `${number}% ${number}`;

export const oklch: Record<Mode, Record<Color, LightnessAndChroma>> = {
  light: {
    primary: "56% 0.15",
    "primary-contrast": "99% 0.005",
    container: "27% 0.06",
    "container-contrast": "93% 0.03",
    tint: "97% 0.011",
    "tint-contrast": "100% 0",
  },
  dark: {
    primary: "88% 0.064",
    "primary-contrast": "35% 0.1",
    container: "93% 0.03",
    "container-contrast": "45% 0.1",
    tint: "28% 0.02",
    "tint-contrast": "16% 0.02",
  },
} as const;
