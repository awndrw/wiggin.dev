import React from "react";
import { Sora } from "@next/font/google";
import { cookies } from "next/headers";
import c from "classnames";
import { colorSchema } from "utils/theme";

import "./globals.scss";

const sora = Sora({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const color = getColorCookie();

  return (
    <html lang="en">
      <body className={c(sora.className)}>{children}</body>
    </html>
  );
}

function getColorCookie() {
  const cookie = cookies().get("color")?.value;
  const color = colorSchema.safeParse(cookie);
  return color.success ? color.data : undefined;
}
