import { z } from "zod";

export const colorSchema = z.enum(["red", "green", "blue"] as const);
export type Color = z.infer<typeof colorSchema>;
