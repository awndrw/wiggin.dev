import { type ActionName, datadog } from "utils/rum";

export interface ActionProps {
  name: ActionName;
  [key: string]: unknown;
}

export const useAction = ({ name, ...props }: ActionProps) => {
  return (context?: object) =>
    datadog.addAction(name, {
      ...props,
      ...context,
    });
};
