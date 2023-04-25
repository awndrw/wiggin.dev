import va from "@vercel/analytics";

import { type ActionMap, type Action } from "analytics/constants";

export function trackAction<Name extends Action>(
  ...[name, props]: ActionMap[Name] extends never
    ? [Name]
    : [Name, ActionMap[Name]]
) {
  va.track(name, props);
}
