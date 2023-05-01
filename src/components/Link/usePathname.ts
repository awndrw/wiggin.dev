"use client";

import { usePathname as useNextPathname } from "next/navigation";

import { type RoutePath } from ".types/routes";

export function usePathname() {
  const pathname = useNextPathname();
  return (pathname.replace(/^\/[1-9][0-9]{0,2}/, "") || "") as RoutePath;
}
