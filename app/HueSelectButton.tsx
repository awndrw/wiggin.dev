"use client";

import { Interaction } from "components/Interaction";
import { useSetAtom } from "jotai";
import React from "react";
import { Target } from "react-feather";
import { customHuePopoverAtom } from "store";

export interface HueSelectButtonProps {
  children: React.ReactNode;
}

export const HueSelectButton: React.FC<HueSelectButtonProps> = ({
  children,
}) => {
  const setShowPopover = useSetAtom(customHuePopoverAtom);

  return (
    <Interaction
      component="span"
      role="button"
      tabIndex={0}
      icon={Target}
      onClick={() => setShowPopover(true)}
    >
      {children}
    </Interaction>
  );
};
