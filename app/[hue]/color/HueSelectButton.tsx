"use client";

import { useSetAtom } from "jotai";
import React from "react";

import { Button, type ButtonProps } from "components/Button";
import { customHuePopoverAtom } from "store";

export type HueSelectButtonProps = Omit<ButtonProps, "onClick">;

export const HueSelectButton: React.FC<HueSelectButtonProps> = ({
  children,
  ...props
}) => {
  const setShowPopover = useSetAtom(customHuePopoverAtom);

  return (
    <Button onClick={() => setShowPopover(true)} {...props}>
      {children}
    </Button>
  );
};
