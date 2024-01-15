import { Slot } from "@radix-ui/react-slot";
import { type PropsWithChildren, type ForwardedRef, forwardRef } from "react";

import { trackAction } from "analytics";
import { type ActionMap, type Action } from "analytics/constants";

export type ActionProps<Name extends Action> = ActionMap[Name] extends never
  ? {
      action: Name;
    }
  : {
      action: Name;
    } & ActionMap[Name];

export const Trigger = forwardRef(TriggerImpl);
function TriggerImpl<Name extends Action>(
  { children, action, ...data }: PropsWithChildren<ActionProps<Name>>,
  ref: ForwardedRef<HTMLHtmlElement>,
) {
  return (
    // @ts-expect-error Poorly typed Action data
    <Slot ref={ref} onClick={() => trackAction(action, data)}>
      {children}
    </Slot>
  );
}
