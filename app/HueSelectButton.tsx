"use client";

import { Interaction } from "components/Interaction";
import React from "react";
import { Target } from "react-feather";
import { CustomHueContext } from "store/CustomHue";

export interface HueSelectButtonProps {
  children: React.ReactNode;
}

export const HueSelectButton: React.FC<HueSelectButtonProps> = ({
  children,
}) => {
  const { setShowPopover } = React.useContext(CustomHueContext);

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
