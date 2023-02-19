import { z } from "zod";

export const HUES = [18, 143, 233] as const;
export const DEFAULT_HUE = HUES[0];
export const HueSchema = z.number().gte(0).lte(360).int();
export type Hue = z.infer<typeof HueSchema>;

export const MODES = ["light", "dark"] as const;
export const DEFAULT_MODE = MODES[0];
export const ModeSchema = z.enum(MODES);
export type Mode = z.infer<typeof ModeSchema>;

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
