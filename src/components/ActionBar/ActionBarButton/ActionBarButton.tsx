import { Slot } from "@radix-ui/react-slot";
import c from "classnames";
import React from "react";

import styles from "./ActionBarButton.module.scss";

export interface ActionBarButtonProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export const ActionBarButton = React.forwardRef<
  HTMLElement,
  ActionBarButtonProps
>(({ children, className, accentColor, ...props }, ref) => {
  return (
    <div
      className={c(styles.wrapper, className)}
      // @ts-expect-error custom properties work but aren't typed
      style={{ "--accent-color": accentColor }}
      {...props}
    >
      <Slot ref={ref} className={styles.button}>
        {children}
      </Slot>
    </div>
  );
});
ActionBarButton.displayName = "ActionBarButton";
