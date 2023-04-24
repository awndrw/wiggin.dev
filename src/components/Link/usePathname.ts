"use client";

import { usePathname as useNextPathname } from "next/navigation";

import { type LocalRoute } from "./types";

export function usePathname() {
  const pathname = useNextPathname();
  return (pathname.replace(/^\/[0-9]{1,3}/, "") || "") as LocalRoute;
}
