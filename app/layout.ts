import type React from "react";

import { url } from "constants/url";

export const metadata = {
  metadataBase: url,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
