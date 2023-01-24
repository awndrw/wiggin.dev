import { z } from "zod";

export const DEFAULT_COLOR = "red";

export const Color = z.enum(["red", "green", "blue"] as const);
export type Color = z.infer<typeof Color>;
