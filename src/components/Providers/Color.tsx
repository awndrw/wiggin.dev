import React from "react";
import { Color } from "utils/theme";
import { setCookie } from "cookies-next";

interface Context {
  getColor: () => Color;
  setColor: (color: Color) => void;
}
export const Context = React.createContext<Context>({
  getColor: () => "neutral",
  setColor: () => null,
});

export function Provider({
  initialColor,
  children,
}: {
  initialColor: Color;
  children: React.ReactNode;
}) {
  const getColor = () => {
    if (typeof document === "undefined") return initialColor;
    let currentColor: Color = "neutral";
    document.body.classList.forEach((className) => {
      const color = Color.safeParse(className);
      if (color.success) {
        currentColor = color.data;
      }
    });
    return currentColor;
  };

  const setColor = (newColor: Color) => {
    const currentColor = getColor();
    if (currentColor && newColor) {
      document.body.classList.replace(currentColor, newColor);
    } else if (currentColor && !newColor) {
      document.body.classList.remove(currentColor);
    } else if (newColor && !currentColor) {
      document.body.classList.add(newColor);
    }
    setCookie("color", newColor, { maxAge: 2_592_000 });
  };

  return (
    <Context.Provider value={{ getColor, setColor }}>
      {children}
    </Context.Provider>
  );
}
