import cx from "classnames";
import { type ComponentProps, type FC } from "react";

import styles from "./Text.module.scss";

export type TextProps = ComponentProps<"p">;

export const Text: FC<TextProps> = ({ children, className, ...props }) => {
  return (
    <p className={cx(styles.text, className)} {...props}>
      {children}
    </p>
  );
};
