import { atomWithListener } from "utils/atomWithListener";
import { DEFAULT_MODE, type Mode } from "utils/theme/color";
import { updateThemeColor } from "utils/theme/style";

export const modeAtom = atomWithListener<Mode>(DEFAULT_MODE, (mode) => {
  document.body.setAttribute("data-mode", mode);
  updateThemeColor();
});
modeAtom.onMount = (setAtom) => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setAtom(isDarkMode ? "dark" : "light");
};
