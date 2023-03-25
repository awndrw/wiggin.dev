import { datadog } from "utils/rum";

import { type Action } from "./Action";

export const useAction = ({ name, ...props }: Action) => {
  return (context?: object) =>
    datadog.addAction(name, {
      ...props,
      ...context,
    });
};
