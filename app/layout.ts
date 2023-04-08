import type React from "react";

import { url } from "constants/url";

export const metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  metadataBase: url,
  openGraph: {
    type: "website",
    title: "Andrew Wiggin",
    description: "",
  },
  twitter: {
    card: "summary",
    site: "@wiggindev",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
