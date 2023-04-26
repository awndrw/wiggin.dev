import type React from "react";

import { host, url } from "constants/url";

import "./globals.scss";

export const metadata = {
  title: {
    default: host,
    template: `${host}/%s`,
  },
  description:
    "Andrew Wiggin is a brooklyn based design engineer passionate about frontend architecture, accessibility, and design systems.",
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
