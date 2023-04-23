import { z } from "zod";

import { type Hue, type Mode } from "theme/constants";

export const Action = {
  SET_HUE: "Set hue",
  SET_MODE: "Set mode",
  OPEN_DOCS: "Open docs",
} as const;
export const ActionSchema = z.nativeEnum(Action);
export type Action = z.infer<typeof ActionSchema>;

export interface ActionMap {
  [Action.SET_HUE]: { hue: Hue; preset: boolean };
  [Action.SET_MODE]: { mode: Mode };
  [Action.OPEN_DOCS]: never;
}
