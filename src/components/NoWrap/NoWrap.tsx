import React from "react";

export type NoWrapProps = React.ComponentPropsWithoutRef<"span">;

export const NoWrap: React.FC<NoWrapProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <span style={{ display: "inline-block", ...style }} {...props}>
      {children}
    </span>
  );
};
