import cx from "classnames";
import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  forwardRef,
} from "react";

import styles from "./Text.module.scss";

export type TextProps = ComponentPropsWithoutRef<"p">;

export const Text = forwardRef(TextImpl);
function TextImpl(
  { children, className, ...props }: TextProps,
  ref: ForwardedRef<HTMLParagraphElement>,
) {
  return (
    <p className={cx(styles.text, className)} ref={ref} {...props}>
      {children}
    </p>
  );
}
