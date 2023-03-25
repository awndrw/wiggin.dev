"use client";

import React from "react";

import { ActionName } from "analytics/constants";
import { Action } from "components/Action";
import { Interaction } from "components/Interaction";
import { useSetAtom } from "jotai";
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
    <Action name={ActionName.TOGGLE_HUE_SLIDER} from="home">
      <Interaction
        component="span"
        role="button"
        tabIndex={0}
        icon={Target}
        onClick={() => setShowPopover(true)}
      >
        {children}
      </Interaction>
    </Action>
  );
};
