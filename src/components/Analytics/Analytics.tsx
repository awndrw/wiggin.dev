import {
  Analytics as VercelAnalytics,
  type AnalyticsProps as VercelAnalyticsProps,
} from "@vercel/analytics/react";
import React from "react";

import { env } from "constants/env";

export const Analytics: React.FC<VercelAnalyticsProps> = (
  vercelAnalyticsProps
) => {
  React.useEffect(() => {
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
