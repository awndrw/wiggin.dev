"use client";

import { useSetAtom } from "jotai";
import React from "react";

import { Button } from "components/Button";
import { customHuePopoverAtom } from "store";

export interface HueSelectButtonProps {
  children: React.ReactNode;
}

export const HueSelectButton: React.FC<HueSelectButtonProps> = ({
  children,
}) => {
  const setShowPopover = useSetAtom(customHuePopoverAtom);

  return <Button onClick={() => setShowPopover(true)}>{children}</Button>;
};
