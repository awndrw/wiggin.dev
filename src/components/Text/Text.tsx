import cx from "classnames";
import React from "react";

import styles from "./Text.module.scss";

export type TextProps = React.ComponentProps<"p">;

export const Text: React.FC<TextProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={cx(styles.text, className)} {...props}>
      {children}
    </p>
  );
};
