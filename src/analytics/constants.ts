import { z } from "zod";

import { type Route } from ".types/routes";
import { type Mode } from "theme/constants";

export const Action = {
  SET_HUE: "Set hue",
  SET_MODE: "Set mode",
  LINK: "Link",
  DOWNLOAD_RESUME: "Download resume",
  RELOAD: "Reload",
} as const;
export const ActionSchema = z.nativeEnum(Action);
export type Action = z.infer<typeof ActionSchema>;

export interface ActionMap {
  [Action.SET_HUE]: never;
  [Action.SET_MODE]: { mode: Mode };
  [Action.LINK]: { from: Route | "404"; to: string };
  [Action.DOWNLOAD_RESUME]: never;
  [Action.RELOAD]: never;
}
