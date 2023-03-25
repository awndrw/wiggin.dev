import React from "react";

import { datadog, init } from "analytics";
import { useAtomValue } from "jotai";
import { hueAtom, modeAtom } from "store";

export const Analytics: React.FC = () => {
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
    console.log(`
                .-====-.                
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
  }, []);

  return null;
};
