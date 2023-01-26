"use client";

import { setCookie } from "cookies-next";
import React from "react";
import { StorageKey } from "utils/constants";
import { Color, DEFAULT_COLOR } from "utils/theme";

export interface Context {
  setColor: (color: Color) => void;
  color: Color;
}

export const Context = React.createContext<Context>({
  setColor: () => null,
  color: DEFAULT_COLOR,
});

export function Provider({
  initialColor,
  children,
}: {
  initialColor: Color;
  children: React.ReactNode;
}) {
  const [color, setColorRaw] = React.useState<Color>(initialColor);

  const setColor = React.useCallback(
    (newColor: Color) => {
      if (newColor === color) return;
      document.body.setAttribute("data-color", newColor);
      setCookie(StorageKey.COLOR, newColor, { maxAge: 2_592_000 });
      setColorRaw(newColor);
    },
    [color]
  );

  return (
    <Context.Provider value={{ setColor, color }}>{children}</Context.Provider>
  );
}
