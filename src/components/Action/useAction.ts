import { datadogRum } from "@datadog/browser-rum";
import { type ActionName } from "utils/rum";

export interface ActionProps {
  name: ActionName;
  [key: string]: any;
}

export const useAction = ({ name, ...props }: ActionProps) => {
  return (context?: object) =>
    datadogRum.addAction(name, {
      ...props,
      ...context,
    });
};
