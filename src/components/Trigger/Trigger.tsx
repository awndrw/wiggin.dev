import { Slot } from "@radix-ui/react-slot";
import React from "react";

import { trackAction } from "analytics";
import { type ActionMap, type Action } from "analytics/constants";

export type ActionProps<Name extends Action> = ActionMap[Name] extends never
  ? {
      action: Name;
    }
  : {
      action: Name;
    } & ActionMap[Name];

function TriggerImpl<Name extends Action>(
  { children, action, ...data }: React.PropsWithChildren<ActionProps<Name>>,
  ref: React.ForwardedRef<HTMLHtmlElement>
) {
  return (
    // @ts-expect-error Poorly typed Action data
    <Slot ref={ref} onClick={() => trackAction(action, data)}>
      {children}
    </Slot>
  );
}

export const Trigger = React.forwardRef(TriggerImpl);
