import React from "react";
import { Target } from "react-feather";

import { Interaction } from "components/Interaction";

type AvailableButtonProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "role" | "tabIndex"
>;

export interface ButtonProps extends AvailableButtonProps {
  children: React.ReactNode;
}

export const Button = React.forwardRef(ButtonImpl);
function ButtonImpl(
  { children, ...buttonProps }: ButtonProps,
  ref: React.ForwardedRef<HTMLSpanElement>
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
