import localFont from "@next/font/local";
import { Analytics } from "client/Analytics";
import { RouteChangeHandler } from "client/RouteChangeHandler";
import { cookies as nextCookies } from "next/headers";
import Providers from "client/providers";
import React from "react";
import { StorageKey } from "utils/constants";
import { env } from "utils/env";
import { Color, DEFAULT_COLOR } from "utils/theme";
import { planarLight } from "fonts";
import { ActionBar } from "./ActionBar";

import "./globals.scss";

export const metadata = {
  icons: {
    icon: [
      { url: "/icons/blue_32.png", sizes: "any" },
      { url: "/icons/blue.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/blue_180.png",
  },
  manifest: "/manifest.webmanifest",
  themeColor: "rgb(0, 128, 184)",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = nextCookies();

  const colorCookie = Color.safeParse(cookies.get(StorageKey.COLOR)?.value);
  const color = colorCookie.success ? colorCookie.data : DEFAULT_COLOR;

  const analyticsMode =
    env.VERCEL_ENV === "production" ? "production" : "development";

  return (
    <html lang="en">
      <body className={planarLight.className} data-color={color}>
        <Providers initialColor={color}>
          <RouteChangeHandler>{children}</RouteChangeHandler>
          <ActionBar />
        </Providers>
        <Analytics mode={analyticsMode} />
      </body>
    </html>
  );
}
