import { type Hue, HueSchema } from "theme/constants";

export function getHue(element: Element): Hue | null;
export function getHue(): Hue | null;
export function getHue(element?: Element): Hue | null {
  if (!element) {
    element = document.body;
  }
  const hueAttr = element.getAttribute("data-hue");
  if (!hueAttr) {
    return element.parentElement ? getHue(element.parentElement) : null;
  }
  const parsedHue = HueSchema.safeParse(parseInt(hueAttr));
  return parsedHue.success ? parsedHue.data : null;
}
