import { hueId, createStyles, getHue } from "theme/utils";

export async function updateGeneratedStyles() {
  const elements = document.querySelectorAll("[data-hue]");
  const promises = [...elements].map(async (element) => {
    const hue = getHue(element);
    const hueStyleExists = hue && document.getElementById(hueId(hue)) !== null;
    if (hue === null || hueStyleExists) return;
    const styleEl = document.createElement("style");
    styleEl.id = hueId(hue);
    styleEl.innerHTML = await createStyles(hue);
    document.head.appendChild(styleEl);
  });
  await Promise.all(promises);
}
