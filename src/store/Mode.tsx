"use client";

import React from "react";
import { DEFAULT_MODE, Mode } from "utils/theme/color";
import { updateThemeColor } from "utils/theme/style";

export interface ModeContext {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const ModeContext = React.createContext<ModeContext>({
  mode: DEFAULT_MODE,
  setMode: () => null,
});

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeRaw] = React.useState<Mode>(DEFAULT_MODE);

  React.useEffect(() => {
    setModeRaw(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  const setMode = React.useCallback(
    (newMode: Mode) => {
      if (newMode === mode) return;
      document.body.setAttribute("data-mode", newMode);
      updateThemeColor();
      setModeRaw(newMode);
    },
    [mode]
  );

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
