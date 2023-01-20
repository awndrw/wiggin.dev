import React from "react";
import { Sora } from "@next/font/google";
import { cookies as nextCookies } from "next/headers";
import Providers from "providers";
import Analytics from "components/Analytics";
import ActionBar from "components/ActionBar";
import ScrollTopOnRouteChange from "components/ScrollTopOnRouteChange";
import { Color } from "utils/theme";
import { StorageKey } from "utils/constants";

import "./globals.scss";

const sora = Sora({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = nextCookies();

  const colorCookie = Color.safeParse(cookies.get(StorageKey.COLOR)?.value);
  const color = colorCookie.success ? colorCookie.data : "neutral";

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
