import { hueId, createStyles, getHue } from "theme/utils";

export function updateGeneratedStyles() {
  document.querySelectorAll("[data-hue]").forEach((element) => {
    const hue = getHue(element);
    const hueStyleExists = hue && document.getElementById(hueId(hue)) !== null;
    if (hue === null || hueStyleExists) return;
    const styleEl = document.createElement("style");
    styleEl.id = hueId(hue);
    styleEl.innerHTML = createStyles(hue);
    document.head.appendChild(styleEl);
  });
}
