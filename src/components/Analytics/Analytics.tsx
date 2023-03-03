import { useAtomValue } from "jotai";
import React from "react";
import { datadogRum } from "@datadog/browser-rum";
import { hueAtom, modeAtom } from "store";
import { init } from "utils/rum";

export const Analytics: React.FC = () => {
  const hue = useAtomValue(hueAtom);
  const mode = useAtomValue(modeAtom);

  React.useEffect(() => {
    datadogRum.setRumGlobalContext({
      hue,
      mode,
    });
  }, [hue, mode]);

  React.useEffect(() => {
    init();
  }, []);

  return null;
};
