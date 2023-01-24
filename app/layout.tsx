import { Sora } from "@next/font/google";
import { Analytics } from "client/Analytics";
import { RouteChangeHandler } from "client/RouteChangeHandler";
import { cookies as nextCookies } from "next/headers";
import Providers from "client/providers";
import React from "react";
import { StorageKey } from "utils/constants";
import { env } from "utils/env";
import { Color, DEFAULT_COLOR } from "utils/theme";
import { ActionBar } from "./ActionBar";

import "./globals.scss";

const sora = Sora({ subsets: ["latin"] });

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
      <body className={sora.className} data-color={color}>
        <Providers initialColor={color}>
          <RouteChangeHandler>{children}</RouteChangeHandler>
          <ActionBar />
        </Providers>
        <Analytics mode={analyticsMode} />
      </body>
    </html>
  );
}
