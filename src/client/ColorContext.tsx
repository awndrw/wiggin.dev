"use client";

import { setCookie } from "cookies-next";
import React from "react";
import { StorageKey } from "utils/constants";
import { Color, DEFAULT_COLOR, DEFAULT_MODE, Mode } from "utils/theme";

export interface Context {
  setColor: (color: Color) => void;
  color: Color;
  setMode: (mode: Mode) => void;
  mode: Mode;
}

export const ColorContext = React.createContext<Context>({
  setColor: () => null,
  color: DEFAULT_COLOR,
  setMode: () => null,
  mode: DEFAULT_MODE,
});

export function ColorProvider({
  initialColor,
  children,
}: {
  initialColor: Color;
  children: React.ReactNode;
}) {
  const [color, setColorRaw] = React.useState<Color>(initialColor);
  const [mode, setModeRaw] = React.useState<Mode>(DEFAULT_MODE);

  React.useEffect(() => {
    setModeRaw(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  React.useEffect(() => {
    updateMetaTags(color);
  }, [color, mode]);

  const setColor = React.useCallback(
    (newColor: Color) => {
      if (newColor === color) return;
      document.body.setAttribute("data-color", newColor);
      setCookie(StorageKey.COLOR, newColor, { maxAge: 2_592_000 });
      setColorRaw(newColor);
    },
    [color]
  );

  const setMode = React.useCallback(
    (newMode: Mode) => {
      if (newMode === mode) return;
      document.body.setAttribute("data-mode", newMode);
      setModeRaw(newMode);
    },
    [mode]
  );

  return (
    <ColorContext.Provider value={{ setColor, color, setMode, mode }}>
      {children}
    </ColorContext.Provider>
  );
}

function updateMetaTags(color: Color) {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const activeColor = getComputedStyle(document.body).accentColor;
  themeColor?.setAttribute("content", activeColor);

  const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
  appleTouchIcon?.setAttribute("href", `/icons/${color}_180.png`);

  const svgIcon = document.querySelector(
    'link[rel="icon"][type="image/svg+xml"]'
  );
  svgIcon?.setAttribute("href", `/icons/${color}.svg`);

  const icon = document.querySelector('link[rel="icon"][sizes="any"]');
  icon?.setAttribute("href", `/icons/${color}_32.png`);
}
