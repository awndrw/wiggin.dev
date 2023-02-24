"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ActionBar } from "client/ActionBar";
import { ReactWrapProvider } from "client/ReactWrapProvider";
import React from "react";
import { CustomHueProvider } from "store/CustomHue";
import { HueProvider } from "store/Hue";
import { type Hue } from "utils/theme/color";

export const Providers = ({
  initialHue,
  children,
}: {
  initialHue: Hue;
  children: React.ReactNode;
}) => (
  <HueProvider initialHue={initialHue}>
    <CustomHueProvider>
      <TooltipProvider>
        <ReactWrapProvider>{children}</ReactWrapProvider>
      </TooltipProvider>
      <ActionBar />
    </CustomHueProvider>
  </HueProvider>
);
