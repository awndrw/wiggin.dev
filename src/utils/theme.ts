import { z } from "zod";

export const DEFAULT_COLOR = "blue";
export const COLORS = ["blue", "red", "green"] as const;

export const Color = z.enum(COLORS);
export type Color = z.infer<typeof Color>;
