"use client";

import { useAtomValue } from "jotai";
import { type Route } from "next";

import { hueAtom } from "store";

import { type LocalRoute, type RouteType } from "./types";

export const useInternalLinkProps = (href: LocalRoute) => {
  const hue = useAtomValue(hueAtom);
  return {
    href: `/${hue}${href}` as Route<RouteType>,
    prefetch: false,
  };
};
