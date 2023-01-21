import { Sora } from "@next/font/google";
import { ActionBar } from "client/ActionBar";
import { Analytics } from "client/Analytics";
import { ScrollTopOnRouteChange } from "client/ScrollTopOnRouteChange";
import { cookies as nextCookies } from "next/headers";
import Providers from "client/providers";
import React from "react";
import { StorageKey } from "utils/constants";
import { Color } from "utils/theme";

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
