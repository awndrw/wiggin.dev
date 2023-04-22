import { Slot } from "@radix-ui/react-slot";
import c from "classnames";
import React from "react";

import styles from "./ActionBarButton.module.scss";

export interface ActionBarButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export const ActionBarButton = React.forwardRef(ActionBarButtonImpl);
function ActionBarButtonImpl(
  { children, className, accentColor, ...props }: ActionBarButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
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
}
