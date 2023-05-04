"use client";

import { datadogRum } from "@datadog/browser-rum";
import {
  Analytics as VercelAnalytics,
  type AnalyticsProps as VercelAnalyticsProps,
} from "@vercel/analytics/react";
import React from "react";

import { trackAction } from "analytics";
import { Action } from "analytics/constants";
import { env } from "constants/env";
import { host } from "constants/url";

export const Analytics: React.FC<VercelAnalyticsProps> = (
  vercelAnalyticsProps
) => {
  React.useEffect(() => {
    if (!env.isDevelopment) {
      console.log(`                .-====-.                
               -========-               
      .:-==-:.:===:  :===-.:-==-:.      
     -===========-    :===========-     
    :===:  .:--:.      .:--:.  :===:    
    .===-                      :===.    
     :===.                    .===:     
  .:-====.                    .====-:.  
 ======-.                      .-======.
====.                              .====
====.                              .====
 -=====-.                      .-====== 
   :-====.                    .====-:.  
     :===.                    .===-     
    .===-                      :===.    
    :===:  .:--:.      .:--:.  :===:    
     -===========-    :===========-     
       :----:.-===:  .===-.:----:.      
               -========-               
                .-====-.                
`);
    }

    const ddApplicationId = process.env.NEXT_PUBLIC_DD_APP_ID;
    const ddClientToken = process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN;
    if (!env.isDevelopment && ddApplicationId && ddClientToken) {
      datadogRum.init({
        applicationId: ddApplicationId,
        clientToken: ddClientToken,
        service: host,
        env: env.value,
        sessionSampleRate: 100,
        sessionReplaySampleRate: 0,
        trackResources: true,
        trackLongTasks: true,
        trackUserInteractions: true,
        trackFrustrations: true,
        silentMultipleInit: true,
      });
    }

    const entries = performance.getEntriesByType("navigation");
    const hasReloadEntry = entries.some(
      (entry) => "type" in entry && entry.type === "reload"
    );
    if (hasReloadEntry) {
      trackAction(Action.RELOAD);
    }
  }, []);

  return <VercelAnalytics {...vercelAnalyticsProps} />;
};
