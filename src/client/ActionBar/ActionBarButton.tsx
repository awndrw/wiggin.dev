import { Slot } from "@radix-ui/react-slot";
import c from "classnames";
import { Icon } from "components/Icon";
import React from "react";
import styles from "./ActionBarButton.module.scss";

interface ActionBarButtonProps extends React.PropsWithChildren {
  focusArrowClassName?: string;
  focusArrowColor?: string;
}

export const ActionBarButton = ({
  focusArrowClassName,
  focusArrowColor,
  children,
}: ActionBarButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <Slot className={styles.button}>{children}</Slot>
      <Icon
        iconName="caret-down"
        className={c(styles.focusArrow, focusArrowClassName)}
        data-color={focusArrowColor}
      />
      <span className={styles.focusArrowBackdrop} />
    </div>
  );
};
