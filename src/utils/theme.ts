import { z } from "zod";

export const DEFAULT_COLOR = "blue";
export const COLORS = ["blue", "red", "green"] as const;

export const DEFAULT_MODE = "light";
export const MODES = ["light", "dark"] as const;

export const Color = z.enum(COLORS);
export type Color = z.infer<typeof Color>;

export const Mode = z.enum(MODES);
export type Mode = z.infer<typeof Mode>;
