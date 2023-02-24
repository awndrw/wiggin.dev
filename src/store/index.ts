import { setCookie } from "cookies-next";
import { createHueStyle, getHue, hueStyleExists, recolor } from "store/util";
import { atomWithListener } from "utils/atomWithListener";
import {
  DEFAULT_HUE,
  DEFAULT_MODE,
  type Hue,
  type Mode,
} from "utils/theme/color";
import { updateThemeColor } from "utils/theme/style";

export const modeAtom = atomWithListener<Mode>(
  DEFAULT_MODE,
  (mode, prevMode) => {
    if (mode === prevMode) return;
    document.body.setAttribute("data-mode", mode);
    updateThemeColor();
  }
);
modeAtom.onMount = (setMode) => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setMode(isDarkMode ? "dark" : "light");
};

export const hueAtom = atomWithListener<Hue>(DEFAULT_HUE, (hue, prevHue) => {
  if (hue === prevHue) return;
  if (!hueStyleExists(hue)) {
    createHueStyle(hue);
  }
  document.body.setAttribute("data-hue", hue.toString());
});
hueAtom.onMount = (setHue) => {
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
};
