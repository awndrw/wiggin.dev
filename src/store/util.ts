import { type Hue, HueSchema } from "utils/theme/color";
import { createStyles } from "utils/theme/style";

const id = (hue: number) => `hue-${hue}`;

export const hueStyleExists = (hue: number) =>
  document.getElementById(id(hue)) !== null;

export const createHueStyle = (hue: Hue) => {
  const styleEl = document.createElement("style");
  styleEl.id = id(hue);
  styleEl.innerHTML = createStyles(hue);
  document.head.appendChild(styleEl);
};

export const getHue = (element: Element) => {
  const hueAttr = element.getAttribute("data-hue");
  if (!hueAttr) return null;
  const parsedHue = HueSchema.safeParse(parseInt(hueAttr));
  return parsedHue.success ? parsedHue.data : null;
};

export const recolor = () => {
  const coloredElements = document.querySelectorAll("[data-hue]");
  coloredElements.forEach((element) => {
    const hue = getHue(element);
    if (hue === null || hueStyleExists(hue)) return;
    createHueStyle(hue);
  });
};
