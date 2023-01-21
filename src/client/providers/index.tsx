"use client";

import React from "react";
import { Provider as ReactWrapProvider } from "react-wrap-balancer";
import { Color as ThemeColor } from "utils/theme";
import * as Color from "./Color";

export { Color };

export default function Providers({
  initialColor,
  children,
}: {
  initialColor: ThemeColor;
  children: React.ReactNode;
}) {
  return (
    <ReactWrapProvider>
      <Color.Provider initialColor={initialColor}>{children}</Color.Provider>
    </ReactWrapProvider>
  );
}
