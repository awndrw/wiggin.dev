"use client";

import { setCookie } from "cookies-next";
import React from "react";
import { DEFAULT_HUE, Hue, HueSchema } from "utils/theme/color";
import { createStyles, updateThemeColor } from "utils/theme/style";

export interface HueContext {
  hue: Hue;
  setHue: (hue: Hue) => void;
}

export const HueContext = React.createContext<HueContext>({
  hue: DEFAULT_HUE,
  setHue: () => null,
});

const hueStyleExists = (hue: number) =>
  document.getElementById(id(hue)) !== null;

const id = (hue: number) => `hue-${hue}`;

const createHue = (hue: number) => {
  const styleEl = document.createElement("style");
  styleEl.id = id(hue);
  styleEl.innerHTML = createStyles(hue);
  document.head.appendChild(styleEl);
};

const getHue = (element: Element) => {
  const hueAttr = element.getAttribute("data-hue");
  if (!hueAttr) return null;
  const parsedHue = HueSchema.safeParse(parseInt(hueAttr));
  return parsedHue.success ? parsedHue.data : null;
};

const recolor = () => {
  const coloredElements = document.querySelectorAll("[data-hue]");
  coloredElements.forEach((element) => {
    const hue = getHue(element);
    if (hue === null || hueStyleExists(hue)) return;
    createHue(hue);
  });
};

export const HueProvider = ({
  initialHue,
  children,
}: {
  initialHue: Hue;
  children: React.ReactNode;
}) => {
  const [hue, setHueRaw] = React.useState<Hue>(initialHue);

  const setHue = React.useCallback(
    (newHue: number) => {
      if (newHue === hue) return;
      if (!hueStyleExists(newHue)) {
        createHue(newHue);
      }
      document.body.setAttribute("data-hue", newHue.toString());
      setHueRaw(newHue);
    },
    [hue]
  );

  React.useEffect(() => {
    recolor();
    updateThemeColor();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName !== "data-hue") continue;
        recolor();
        if (mutation.target === document.body) {
          const hue = getHue(document.body);
          if (hue === null) return;
          setHueRaw(hue);
          setCookie("hue", hue, { maxAge: 2_592_000 });
          updateThemeColor();
        }
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-hue"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <HueContext.Provider value={{ hue, setHue }}>
      {children}
    </HueContext.Provider>
  );
};

const updateHueFromBody = () => {
  const hue = document.body.getAttribute("data-hue");
  if (hue) {
    setCookie("hue", hue, { maxAge: 2_592_000 });
    updateThemeColor();
  }
};
