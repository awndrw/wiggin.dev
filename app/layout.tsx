import { type Metadata } from "next";
import { type ReactNode } from "react";

import { host, url } from "constants/url";

import "./globals.scss";

export const metadata: Metadata = {
  title: {
    default: host,
    template: `${host}/%s`,
  },
  description:
    "Andrew Wiggin is a Brooklyn based design engineer passionate about interaction, accessibility, and design systems.",
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

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
