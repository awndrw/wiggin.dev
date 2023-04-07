import { setCookie } from "cookies-next";
import { atom } from "jotai";

import { updateThemeColor } from "theme";
import {
  DEFAULT_HUE,
  DEFAULT_MODE,
  type Hue,
  type Mode,
} from "theme/constants";
import { getHue, getMode, recolor } from "theme/utils";

import { atomWithLifecycle, AttributeObserver } from "./utils";

const attributeObserver = new AttributeObserver();

export const modeAtom = atomWithLifecycle<Mode>(
  DEFAULT_MODE,
  (setMode) => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(mediaQuery.matches ? "dark" : "light");
    const darkModeListener = (event: MediaQueryListEvent) => {
      setMode(event.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", darkModeListener);
    attributeObserver.observe("data-mode", () => {
      const mode = getMode();
      if (mode === null) return;
      setMode(mode);
      updateThemeColor();
    });
    return () => {
      attributeObserver.disconnect("data-mode");
      mediaQuery.removeEventListener("change", darkModeListener);
    };
  },
  (mode, prevMode) => {
    if (mode === prevMode) return;
    document.body.setAttribute("data-mode", mode);
    updateThemeColor();
  }
);

export const hueAtom = atomWithLifecycle<Hue>(
  DEFAULT_HUE,
  (setHue) => {
    const hue = getHue(document.body);
    if (hue !== null) {
      setHue(hue);
    }
    recolor();
    updateThemeColor();
    attributeObserver.observe("data-hue", (mutation) => {
      recolor();
      if (mutation.target === document.body) {
        const hue = getHue(document.body);
        if (hue === null) return;
        setHue(hue);
        setCookie("hue", hue, { maxAge: 2_592_000 });
        updateThemeColor();
      }
    });
    return () => attributeObserver.disconnect("data-hue");
  },
  (hue, prevHue) => {
    if (hue === prevHue) return;
    document.body.setAttribute("data-hue", hue.toString());
  }
);

export const customHuePopoverAtom = atom(false);
