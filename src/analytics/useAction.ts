import { type Action } from "components/Action";

import { datadog } from "./index";

export const useAction = ({ name, ...props }: Action) => {
  return (context?: object) =>
    datadog.addAction(name, {
      ...props,
      ...context,
    });
};
