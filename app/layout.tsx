import { type Metadata } from "next";
import type React from "react";
import { z } from "zod";

import { host, url } from "constants/url";
import { getEdgeConfig } from "utils/getEdgeConfig";

import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const tagline = await getEdgeConfig("tagline", z.string());
  return {
    title: {
      default: host,
      template: `${host}/%s`,
    },
    description: `Andrew Wiggin is ${tagline}.`,
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
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
