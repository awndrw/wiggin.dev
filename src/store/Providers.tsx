"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ActionBar } from "client/ActionBar";
import { ReactWrapProvider } from "client/ReactWrapProvider";
import React from "react";
import { CustomHueProvider } from "store/CustomHue";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <CustomHueProvider>
    <TooltipProvider>
      <ReactWrapProvider>{children}</ReactWrapProvider>
    </TooltipProvider>
    <ActionBar />
  </CustomHueProvider>
);
