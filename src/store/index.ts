import { setCookie } from "cookies-next";
import { createHueStyle, getHue, hueStyleExists, recolor } from "store/util";
import { atomWithLifecycle } from "utils/atomWithLifecycle";
import {
  DEFAULT_HUE,
  DEFAULT_MODE,
  type Hue,
  type Mode,
} from "utils/theme/color";
import { updateThemeColor } from "utils/theme/style";

export const modeAtom = atomWithLifecycle<Mode>(
  DEFAULT_MODE,
  (setMode) => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setMode(isDarkMode ? "dark" : "light");
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
    recolor();
    updateThemeColor();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        console.log(mutation);
        if (mutation.attributeName !== "data-hue") continue;
        recolor();
        if (mutation.target === document.body) {
          const hue = getHue(document.body);
          if (hue === null) return;
          setHue(hue);
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
  },
  (hue, prevHue) => {
    if (hue === prevHue) return;
    if (!hueStyleExists(hue)) {
      createHueStyle(hue);
    }
    document.body.setAttribute("data-hue", hue.toString());
  }
);
