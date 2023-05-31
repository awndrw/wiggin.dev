import { type Mode, type Color } from "./constants";

export const lightnessAndChromaValues: Record<
  Mode,
  Record<Color, readonly [number, number]>
> = {
  light: {
    primary: [0.4, 0.15],
    "primary-contrast": [0.99, 0.005],
    container: [0.27, 0.06],
    "container-contrast": [0.93, 0.03],
    tint: [0.97, 0.011],
    "tint-contrast": [1, 0],
  },
  dark: {
    primary: [0.88, 0.064],
    "primary-contrast": [0.3, 0.1],
    container: [0.93, 0.03],
    "container-contrast": [0.45, 0.1],
    tint: [0.28, 0.02],
    "tint-contrast": [0.16, 0.02],
  },
} as const;
