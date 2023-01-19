import React from "react";
import { Sora } from "@next/font/google";
import { cookies } from "next/headers";
import c from "classnames";
import { Color } from "utils/theme";
import Providers from "components/Providers";
import Analytics from "components/Analytics";

import "./globals.scss";

const sora = Sora({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const color = getColorCookie();

  return (
    <html lang="en">
      <body className={c(sora.className, color)}>
        <Providers initialColor={color}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

function getColorCookie(): Color {
  const cookie = cookies().get("color")?.value;
  const color = Color.safeParse(cookie);
  return color.success ? color.data : "neutral";
}
