"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function RouteChangeHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
    document.body.focus();
  }, [pathname]);

  return <>{children}</>;
}
