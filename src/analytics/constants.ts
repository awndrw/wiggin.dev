import { z } from "zod";

import { type Hue, type Mode } from "theme/constants";

export const ActionName = {
  SET_HUE: "Set hue",
  SET_MODE: "Set mode",
  OPEN_DOCS: "Open docs",
} as const;
export const ActionNameSchema = z.nativeEnum(ActionName);
export type ActionName = z.infer<typeof ActionNameSchema>;

export interface ActionMap {
  [ActionName.SET_HUE]: { hue: Hue; preset: boolean };
  [ActionName.SET_MODE]: { mode: Mode };
  [ActionName.OPEN_DOCS]: never;
}
