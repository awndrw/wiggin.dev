import { z } from "zod";

export const ActionName = {
  SET_HUE: "Set hue",
  SET_MODE: "Set mode",
  TOGGLE_HUE_SLIDER: "Toggle hue slider",
} as const;
export const ActionNameSchema = z.nativeEnum(ActionName);
export type ActionName = z.infer<typeof ActionNameSchema>;
