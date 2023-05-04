import va from "@vercel/analytics";

import { type Route, RouteSchema } from ".types/routes";
import { type ActionMap, type Action } from "analytics/constants";

const isRoute = (prop: unknown): prop is Route =>
  RouteSchema.safeParse(prop).success;

function preprocessProps(props: ActionMap[Action]) {
  return Object.entries(props).reduce((res, [key, value]) => {
    if (typeof value === "boolean") {
      res[key] = value ? "yes" : "no";
    } else if (isRoute(value)) {
      res[key] = value.toLowerCase();
    } else {
      res[key] = value;
    }
    return res;
  }, {} as Record<string, string | number | boolean | null>);
}

export function trackAction<Name extends Action>(
  ...[name, props]: ActionMap[Name] extends never
    ? [Name]
    : [Name, ActionMap[Name]]
) {
  const processedProps = props ? preprocessProps(props) : undefined;
  va.track(name, processedProps);
}
