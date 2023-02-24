"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ActionBar } from "client/ActionBar";
import { ReactWrapProvider } from "client/ReactWrapProvider";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <>
    <TooltipProvider>
      <ReactWrapProvider>{children}</ReactWrapProvider>
    </TooltipProvider>
    <ActionBar />
  </>
);
