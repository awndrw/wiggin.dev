"use client";

import { useAtomValue } from "jotai";
import { type Route as NextRoute } from "next";

import { type FullRoute, type RoutePath } from ".types/routes";
import { hueAtom } from "store";

export const useInternalLinkProps = (href: RoutePath) => {
  const hue = useAtomValue(hueAtom);
  return {
    href: `/${hue}${href}` as NextRoute<FullRoute>,
  };
};
