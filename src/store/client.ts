import {
  updateThemeColor,
  getHue,
  getMode,
  getAvailableHues,
} from "theme/client";
import {
  DEFAULT_HUE,
  DEFAULT_MODE,
  type Hue,
  type Mode,
} from "theme/constants";

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
    updateThemeColor();
    attributeObserver.observe("data-hue", (mutation) => {
      if (mutation.target === document.body) {
        let hue = getHue(document.body);
        if (hue === null) return;
        const availableHues = getAvailableHues();
        if (!availableHues.includes(hue)) {
          hue = availableHues.sort(
            (a, b) => Math.abs(hue! - a) - Math.abs(hue! - b)
          )[0];
          document.body.setAttribute("data-hue", hue.toString());
        }
        setHue(hue);
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
