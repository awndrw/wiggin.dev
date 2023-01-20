"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function ScrollTopOnRouteChange({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  React.useEffect(() => window.scrollTo({ top: 0 }), [pathname]);

  return <>{children}</>;
}
