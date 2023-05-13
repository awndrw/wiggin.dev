import { ImageResponse } from "next/server";

import { Logo } from "components/Logo";
import { getHexForColor } from "theme/server";
import { parseHue } from "theme/shared";

export const alt = "";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default function OpengraphImage({
  params: { hue: hueParam },
}: {
  params: { hue: string };
}) {
  const hue = parseHue(hueParam);
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
    {
      ...size,
      fonts: [],
    }
  );
}
