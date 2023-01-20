"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function ScrollTopOnRouteChange({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  React.useEffect(() => window.scrollTo({ top: 0 }), [pathname]);

  return <>{children}</>;
}
