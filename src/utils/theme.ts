import { z } from "zod";

export const Color = z.enum(["red", "green", "blue", "neutral"] as const);
export type Color = z.infer<typeof Color>;
