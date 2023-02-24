import { z } from "zod";

export const HUES = [18, 143, 233] as const;
export const HueSchema = z.number().gte(0).lte(360).int().brand<"Hue">();
export type Hue = z.infer<typeof HueSchema>;
export const DEFAULT_HUE = HueSchema.parse(HUES[0]);
export const isHue = (hue: number): hue is Hue =>
  HueSchema.safeParse(hue).success;

export const MODES = ["light", "dark"] as const;
export const ModeSchema = z.enum(MODES);
export type Mode = z.infer<typeof ModeSchema>;
export const DEFAULT_MODE = MODES[0];

export const COLORS = [
  "primary",
  "primary-contrast",
  "container",
  "container-contrast",
  "tint",
  "tint-contrast",
] as const;
export const ColorSchema = z.enum(COLORS);
export type Color = z.infer<typeof ColorSchema>;
