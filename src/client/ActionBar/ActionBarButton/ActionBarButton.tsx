import { Slot } from "@radix-ui/react-slot";
import c from "classnames";
import { Icon } from "components/Icon";
import React from "react";
import { ChevronDown } from "react-feather";
import styles from "./ActionBarButton.module.scss";

interface ActionBarButtonProps extends React.PropsWithChildren {
  focusArrowClassName?: string;
  focusArrowColor?: string;
}

export const ActionBarButton = React.forwardRef<
  HTMLElement,
  ActionBarButtonProps
>(({ focusArrowClassName, focusArrowColor, children }, ref) => {
  return (
    <div className={styles.wrapper}>
      <Slot ref={ref} className={styles.button}>
        {children}
      </Slot>
      <Icon
        icon={ChevronDown}
        className={c(styles.focusArrow, focusArrowClassName)}
        data-color={focusArrowColor}
      />
      <span className={styles.focusArrowBackdrop} />
    </div>
  );
});
ActionBarButton.displayName = "ActionBarButton";
