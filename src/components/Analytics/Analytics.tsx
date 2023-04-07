import { useAtomValue } from "jotai";
import React from "react";

import { datadog, init } from "analytics";
import { env } from "constants/env";
import { type Locale } from "i18n/constants";
import { hueAtom, modeAtom } from "store";

export const Analytics: React.FC<{ locale: Locale }> = ({ locale }) => {
  const hue = useAtomValue(hueAtom);
  const mode = useAtomValue(modeAtom);

  React.useEffect(() => {
    datadog.setRumGlobalContext({
      hue,
      mode,
      locale,
    });
  }, [hue, mode, locale]);

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

  return null;
};
