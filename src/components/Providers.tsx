"use client";

import React from "react";
import { Provider } from "react-wrap-balancer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
