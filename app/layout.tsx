import { Provider as TooltipProvider } from "client/radix/Tooltip";
import { Analytics } from "client/Analytics";
import { ColorProvider } from "client/ColorContext";
import { cookies as nextCookies } from "next/headers";
import React from "react";
import { ReactWrapProvider } from "client/ReactWrapProvider";
import { StorageKey } from "utils/constants";
import { env } from "utils/env";
import { Color, DEFAULT_COLOR } from "utils/theme";
import { america } from "fonts";
import { ActionBar } from "client/ActionBar";

import "./globals.scss";

export const metadata = {
  title: {
    default: "wiggin.dev",
    template: "wiggin.dev/%s",
  },
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
  const colorCookie = cookies.get(StorageKey.COLOR)?.value ?? "";
  const parsedColor = Color.safeParse(colorCookie);
  const color = parsedColor.success ? parsedColor.data : DEFAULT_COLOR;

  const analyticsMode =
    env.VERCEL_ENV === "production" ? "production" : "development";

  return (
    <html lang="en">
      <body className={america.className} data-color={color}>
        <ColorProvider initialColor={color}>
          <TooltipProvider>
            <ReactWrapProvider>{children}</ReactWrapProvider>
          </TooltipProvider>
          <ActionBar />
        </ColorProvider>
        <Analytics mode={analyticsMode} />
      </body>
    </html>
  );
}
