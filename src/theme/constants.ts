import { z } from "zod";

export const HueSchema = z.preprocess(
  (arg) => (typeof arg === "string" ? parseInt(arg) : arg),
  z.number().gte(0).lte(360).int().brand<"Hue">()
);
export type Hue = z.infer<typeof HueSchema>;
export const HUES = [
  HueSchema.parse(18),
  HueSchema.parse(143),
  HueSchema.parse(233),
] as const;
export const DEFAULT_HUE = HUES[0];
export const isHue = (hue: number): hue is Hue =>
  HueSchema.safeParse(hue).success;
export const parseHue = (hue: unknown, fallback?: Hue): Hue => {
  const parsedHue = HueSchema.safeParse(hue);
  return parsedHue.success ? parsedHue.data : fallback ?? getRandomHue();
};
export const getRandomHue = (max = 120) =>
  HueSchema.parse(Math.floor(Math.random() * max));
export const getPresetHues = (baseHue: Hue) => {
  if (baseHue <= 120) {
    return [
      baseHue,
      HueSchema.parse(baseHue + 120),
      HueSchema.parse(baseHue + 240),
    ];
  }
  if (baseHue <= 240) {
    return [
      HueSchema.parse(baseHue - 120),
      baseHue,
      HueSchema.parse(baseHue + 120),
    ];
  }
  return [
    HueSchema.parse(baseHue - 240),
    HueSchema.parse(baseHue - 120),
    baseHue,
  ];
};

export const ModeSchema = z.enum(["light", "dark"] as const);
export type Mode = z.infer<typeof ModeSchema>;
export const MODES = ModeSchema.options;
export const DEFAULT_MODE = MODES[0];

export const ColorSchema = z.enum([
  "primary",
  "primary-contrast",
  "container",
  "container-contrast",
  "tint",
  "tint-contrast",
] as const);
export type Color = z.infer<typeof ColorSchema>;
export const COLORS = ColorSchema.options;
