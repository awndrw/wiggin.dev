import { Slot } from "@radix-ui/react-slot";
import React from "react";
import styles from "./ActionBarButton.module.scss";

export interface ActionBarButtonProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

export const ActionBarButton = React.forwardRef<
  HTMLElement,
  ActionBarButtonProps
>(({ children }, ref) => {
  return (
    <div className={styles.wrapper}>
      <Slot ref={ref} className={styles.button}>
        {children}
      </Slot>
    </div>
  );
});
ActionBarButton.displayName = "ActionBarButton";
