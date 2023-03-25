import { datadogRum } from "@datadog/browser-rum";
import { env } from "utils/env";

import packageJson from "../../package.json";

function makeMockDatadogApi() {
  const globalContext: Record<string, unknown> = {};
  return {
    init: () => null,
    addAction: (name: string, context?: object) => {
      console.log(
        `%c[rum]%c ${name}\n`,
        "color: rgb(120, 120, 120)",
        "color: inherit",
        {
          ...globalContext,
          ...context,
        }
      );
    },
    setRumGlobalContext: (context: object) => {
      Object.assign(globalContext, context);
    },
  };
}

export const datadog: Pick<
  typeof datadogRum,
  "init" | "addAction" | "setRumGlobalContext"
> = env === "development" ? makeMockDatadogApi() : datadogRum;

export const init = () => {
  const ddAppId = process.env.NEXT_PUBLIC_DD_APP_ID;
  const ddClientToken = process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN;
  if (!ddAppId || !ddClientToken || navigator.userAgent.includes("Headless")) {
    return;
  }
  datadog.init({
    applicationId: ddAppId,
    clientToken: ddClientToken,
    site: "datadoghq.com",
    service: "wiggin.dev",
    env,
    version: packageJson.version,
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    trackFrustrations: true,
    silentMultipleInit: true,
  });
};
