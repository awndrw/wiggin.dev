"use client";

import React from "react";
import { Provider } from "react-wrap-balancer";
import { Color } from "utils/theme";
import { Provider as ColorProvider } from "components/Providers/Color";

export default function Providers({
  initialColor,
  children,
}: {
  initialColor: Color;
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <ColorProvider initialColor={initialColor}>{children}</ColorProvider>
    </Provider>
  );
}
