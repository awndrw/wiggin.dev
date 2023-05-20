import { type FC, type ComponentPropsWithoutRef } from "react";

export type NoWrapProps = ComponentPropsWithoutRef<"span">;

export const NoWrap: FC<NoWrapProps> = ({ children, style, ...props }) => {
  return (
    <span style={{ display: "inline-block", ...style }} {...props}>
      {children}
    </span>
  );
};
