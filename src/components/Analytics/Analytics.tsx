import React from "react";

import { datadog, init } from "analytics";
import { type Locale } from "i18n/constants";
import { useAtomValue } from "jotai";
import { hueAtom, modeAtom } from "store";
import { env } from "utils/env";

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
    if (env !== "development") {
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
