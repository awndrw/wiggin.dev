"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Context as ColorContext } from "providers/Color";

export default function Themed({ children }: { children: React.ReactNode }) {
  const { color } = React.useContext(ColorContext);

  return <Slot className={color}>{children}</Slot>;
}
