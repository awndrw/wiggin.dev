"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import { Provider as ReactWrapProvider } from "react-wrap-balancer";
import { Provider as ColorProvider } from "client/providers/Color";
import type { Color } from "utils/theme";

export default function Providers({
  children,
  initialColor,
}: {
  initialColor: Color;
  children: React.ReactNode;
}) {
  return (
    <ReactWrapProvider>
      <TooltipProvider>
        <ColorProvider initialColor={initialColor}>{children}</ColorProvider>
      </TooltipProvider>
    </ReactWrapProvider>
  );
}
