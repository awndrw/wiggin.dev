"use client";

import { useAtomValue } from "jotai";
import { type Route as NextRoute } from "next";

import { type LocalRoute, type Route } from ".types/route";
import { hueAtom } from "store";

export const useInternalLinkProps = (href: LocalRoute) => {
  const hue = useAtomValue(hueAtom);
  return {
    href: `/${hue}${href}` as NextRoute<Route>,
    prefetch: false,
  };
};
