"use client";

import { useAtomValue } from "jotai";
import { type Route as NextRoute } from "next";

import { type FullRoute, type Route } from ".types/routes";
import { hueAtom } from "store";

export const useInternalLinkProps = (href: Route) => {
  const hue = useAtomValue(hueAtom);
  return {
    href: `/${hue}${href}` as NextRoute<FullRoute>,
    prefetch: false,
  };
};
