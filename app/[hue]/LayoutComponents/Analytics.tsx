"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import React from "react";

import { trackAction } from "analytics";
import { Action } from "analytics/constants";
import { env } from "constants/env";

export const Analytics: React.FC = () => {
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

    const entries = performance.getEntriesByType("navigation");
    const hasReloadEntry = entries.some(
      (entry) => "type" in entry && entry.type === "reload"
    );
    if (hasReloadEntry) {
      trackAction(Action.RELOAD);
    }
  }, []);

  return <VercelAnalytics />;
};
