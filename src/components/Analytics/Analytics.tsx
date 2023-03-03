import React from "react";
import { datadogRum } from "@datadog/browser-rum";
import { log } from "utils/log";

export const Analytics: React.FC = () => {
  React.useEffect(() => {
    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DD_APP_ID!,
      clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN!,
      site: "datadoghq.com",
      service: "wiggin.dev",
      env: process.env.NEXT_PUBLIC_VERCEL_ENV,
      silentMultipleInit: process.env.NEXT_PUBLIC_VERCEL_ENV === "production",
      actionNameAttribute: "data-action",
      trackUserInteractions: true,
      beforeSend: (event) => {
        if (event.type === "action") {
          log(event.action.target?.name ?? "action", event);
        }
        return true;
      },
    });
  }, []);

  return null;
};
