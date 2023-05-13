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
