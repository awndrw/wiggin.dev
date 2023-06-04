import { ImageResponse } from "next/server";

import { Logo } from "components/Logo";
import { parseHue, getHexForColor } from "theme/utils";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";
export const runtime = "edge";

export default function Icon({
  params: { hue: hueParam },
}: {
  params: { hue: string };
}) {
  const hue = parseHue(hueParam);
  const primary = getHexForColor(hue, "light", "primary");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo width={32} height={32} type="light" stroke={primary} />
      </div>
    ),
    {
      ...size,
      fonts: [],
    }
  );
}
