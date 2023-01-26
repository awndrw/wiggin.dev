import { z } from "zod";

export const DEFAULT_COLOR = "blue";
export const COLORS = ["red", "green", "blue"] as const;

export const Color = z.enum(COLORS);
export type Color = z.infer<typeof Color>;
