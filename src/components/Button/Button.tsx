import { forwardRef, type ForwardedRef } from "react";
import { Target } from "react-feather";

import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";

export type ButtonProps = Omit<
  InteractionComponentProps<"span">,
  "role" | "tabIndex"
>;

export const Button = forwardRef(ButtonImpl);
function ButtonImpl(
  { children, ...buttonProps }: ButtonProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <Interaction
      component="span"
      role="button"
      tabIndex={0}
      icon={Target}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </Interaction>
  );
}
