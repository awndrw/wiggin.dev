import { z } from "zod";

import { RouteName } from ".types/routes";
import { type Mode } from "theme/constants";

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

export namespace EventData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export import Route = RouteName;
}

export interface ActionMap {
  [Action.SET_HUE]: never;
  [Action.SET_MODE]: { mode: Mode };
  [Action.LINK]: { from: EventData.Route; to: string };
  [Action.DOWNLOAD_RESUME]: never;
  [Action.COPY_ENV_VAR]: { name: string };
  [Action.RELOAD]: never;
}
