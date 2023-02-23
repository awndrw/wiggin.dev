import { Slot } from "@radix-ui/react-slot";
import React from "react";
import styles from "./ActionBarButton.module.scss";

export interface ActionBarButtonProps {
  children: React.ReactNode;
  accentColor?: string;
}

export const ActionBarButton = React.forwardRef<
  HTMLElement,
  ActionBarButtonProps
>(({ children, accentColor, ...props }, ref) => {
  return (
    <div
      className={styles.wrapper}
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
