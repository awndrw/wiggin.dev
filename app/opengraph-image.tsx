import { cookies as nextCookies } from "next/dist/client/components/headers";
import { ImageResponse } from "next/server";

import { Logo } from "components/Logo";
import { StorageKey } from "store/constants";
import { DEFAULT_HUE, HueSchema } from "theme/constants";
import { getHexForColor } from "theme/utils";

export const alt = "";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function opengraphImage() {
  const cookies = nextCookies();
  const hueCookie = cookies.get(StorageKey.HUE)?.value;
  const parsedHue = hueCookie ? HueSchema.safeParse(parseInt(hueCookie)) : null;
  const hue = parsedHue?.success ? parsedHue.data : DEFAULT_HUE;

  const primary = getHexForColor(hue, "light", "primary");
  const primaryContrast = getHexForColor(hue, "light", "primary-contrast");

  return new ImageResponse(
    (
      <div
        style={{
          background: primaryContrast,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo width={400} height={400} stroke={primary} />
      </div>
    ),
    size
  );
}
