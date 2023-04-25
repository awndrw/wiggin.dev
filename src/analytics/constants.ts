import { z } from "zod";

import { type Hue, type Mode } from "theme/constants";

export const Action = {
  SET_HUE: "Set hue",
  SET_MODE: "Set mode",
  LINK: "Link",
  DOWNLOAD_RESUME: "Download resume",
  COPY_ENV_VAR: "Copy environment variable",
  RELOAD: "Reload",
} as const;
export const ActionSchema = z.nativeEnum(Action);
export type Action = z.infer<typeof ActionSchema>;

export interface ActionMap {
  [Action.SET_HUE]: { hue: Hue; preset: boolean };
  [Action.SET_MODE]: { mode: Mode };
  [Action.LINK]: { from: string; to: string };
  [Action.DOWNLOAD_RESUME]: never;
  [Action.COPY_ENV_VAR]: { name: string };
  [Action.RELOAD]: never;
}
