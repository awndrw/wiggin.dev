import { ModeSchema } from "theme/constants";

export function getMode() {
  const modeAttr = document.body.getAttribute("data-mode");
  if (!modeAttr) return null;
  const parsedMode = ModeSchema.safeParse(modeAttr);
  return parsedMode.success ? parsedMode.data : null;
}
