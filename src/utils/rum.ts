import { datadogRum } from "@datadog/browser-rum";
import { env } from "utils/env";
import { log } from "utils/log";
import { z } from "zod";

export const init = () => {
  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DD_APP_ID!,
    clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN!,
    site: "datadoghq.com",
    service: "wiggin.dev",
    env,
    silentMultipleInit: env === "production",
    beforeSend: (event) => {
      const name =
        event.type === "action"
          ? event.action.target?.name ?? event.type
          : event.type;
      log(name, event);
      return true;
    },
  });
};

export const ActionName = {
  SET_HUE: "Set hue",
  SET_MODE: "Set mode",
  TOGGLE_HUE_SLIDER: "Toggle hue slider",
} as const;
export const ActionNameSchema = z.nativeEnum(ActionName);
export type ActionName = z.infer<typeof ActionNameSchema>;
