import React from "react";
import { Sora } from "@next/font/google";
import { cookies } from "next/headers";
import Providers from "providers";
import Analytics from "components/Analytics";
import ActionBar from "components/ActionBar";
import ScrollTopOnRouteChange from "components/ScrollTopOnRouteChange";
import { Color } from "utils/theme";

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
      <body className={sora.className}>
        <ScrollTopOnRouteChange>
          <Providers initialColor={color}>
            {children}
            <ActionBar />
            <Analytics />
          </Providers>
        </ScrollTopOnRouteChange>
      </body>
    </html>
  );
}

export function getColorCookie(): Color {
  const cookie = cookies().get("color")?.value;
  const color = Color.safeParse(cookie);
  return color.success ? color.data : "neutral";
}
