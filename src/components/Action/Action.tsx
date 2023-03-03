"use client";

import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { type ActionProps, useAction } from "./useAction";

export const Action = React.forwardRef<
  HTMLElement,
  React.PropsWithChildren<ActionProps>
>(({ children, ...props }, ref) => {
  const trigger = useAction(props);

  return (
    <Slot ref={ref} onClick={trigger}>
      {children}
    </Slot>
  );
});
Action.displayName = "Action";
