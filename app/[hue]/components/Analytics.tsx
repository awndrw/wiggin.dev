"use client";

import {
  Analytics as VercelAnalytics,
  type AnalyticsProps as VercelAnalyticsProps,
} from "@vercel/analytics/react";
import { type FC, useEffect } from "react";

import { trackAction } from "analytics";
import { Action } from "analytics/constants";
import { env } from "constants/env";

export const Analytics: FC<VercelAnalyticsProps> = (vercelAnalyticsProps) => {
  useEffect(() => {
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

    const entries = performance.getEntriesByType("navigation");
    const hasReloadEntry = entries.some(
      (entry) => "type" in entry && entry.type === "reload",
    );
    if (hasReloadEntry) {
      trackAction(Action.RELOAD);
    }
  }, []);

  return <VercelAnalytics {...vercelAnalyticsProps} />;
};
