import { cookies as nextCookies } from "next/headers";
import "server-only";

import { StorageKey } from "store/constants";
import { DEFAULT_HUE, HueSchema } from "theme/constants";

export function getServerHue(cookiesInstance?: ReturnType<typeof nextCookies>) {
  const cookies = cookiesInstance || nextCookies();
  const hueCookie = cookies.get(StorageKey.HUE)?.value;
  const parsedHue = hueCookie ? HueSchema.safeParse(parseInt(hueCookie)) : null;
  return parsedHue?.success ? parsedHue.data : DEFAULT_HUE;
}
