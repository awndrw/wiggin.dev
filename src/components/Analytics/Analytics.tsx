import {
  Analytics as VercelAnalytics,
  type AnalyticsProps as VercelAnalyticsProps,
} from "@vercel/analytics/react";
import { useAtomValue } from "jotai";
import React from "react";

import { datadog, init } from "analytics";
import { env } from "constants/env";
import { hueAtom, modeAtom } from "store";

export const Analytics: React.FC<VercelAnalyticsProps> = (
  vercelAnalyticsProps
) => {
  const hue = useAtomValue(hueAtom);
  const mode = useAtomValue(modeAtom);

  React.useEffect(() => {
    datadog.setRumGlobalContext({
      hue,
      mode,
    });
  }, [hue, mode]);

  React.useEffect(() => {
    init();
    if (env.isProduction) {
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
  }, []);

  return <VercelAnalytics {...vercelAnalyticsProps} />;
};
