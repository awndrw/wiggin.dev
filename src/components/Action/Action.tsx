import { Slot } from "@radix-ui/react-slot";
import React from "react";

import { trackAction } from "analytics";
import { type ActionMap, type ActionName } from "analytics/constants";

export type ActionProps<Name extends ActionName> = ActionMap[Name] extends never
  ? {
      name: Name;
    }
  : {
      name: Name;
    } & ActionMap[Name];

function ActionImpl<Name extends ActionName>(
  { children, name, ...props }: React.PropsWithChildren<ActionProps<Name>>,
  ref: React.ForwardedRef<HTMLHtmlElement>
) {
  return (
    // @ts-expect-error Poorly typed Action data
    <Slot ref={ref} onClick={() => trackAction(name, props)}>
      {children}
    </Slot>
  );
}

export const Action = React.forwardRef(ActionImpl);
