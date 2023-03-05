import { useAtomValue } from "jotai";
import React from "react";
import { hueAtom, modeAtom } from "store";
import { datadog, init } from "utils/rum";

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
