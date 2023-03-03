import { datadogRum } from "@datadog/browser-rum";
import { useAtomValue } from "jotai";
import { hueAtom, modeAtom } from "store";
import { log } from "utils/log";
import { type ActionName } from "utils/rum";

export interface ActionProps {
  name: ActionName;
  [key: string]: any;
}

export const useAction = ({ name, ...props }: ActionProps) => {
  const hue = useAtomValue(hueAtom);
  const mode = useAtomValue(modeAtom);

  const context = {
    hue,
    mode,
    ...props,
  };

  return () => {
    log(name, context);
    datadogRum.addAction(name, context);
  };
};
