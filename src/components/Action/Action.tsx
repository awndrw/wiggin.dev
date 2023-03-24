"use client";

import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { type ActionName } from "utils/rum";
import { useAction } from "./useAction";

export interface Action {
  name: ActionName;
  [key: string]: unknown;
}

export const Action = React.forwardRef<
  HTMLElement,
  React.PropsWithChildren<Action>
>(({ children, ...props }, ref) => {
  const trigger = useAction(props);

  return (
    <Slot ref={ref} onClick={trigger}>
      {children}
    </Slot>
  );
});
Action.displayName = "Action";
