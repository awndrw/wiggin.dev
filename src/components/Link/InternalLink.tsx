"use client";

import NextLink from "next/link";
import { forwardRef, type ForwardedRef } from "react";
import { ArrowRight } from "react-feather";

import { type Route, type FullRoute, RoutePath } from ".types/routes";
import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";

import { useInternalLinkProps } from "./useInternalLinkProps";

export type InternalLinkProps = Omit<
  InteractionComponentProps<typeof NextLink<FullRoute>>,
  "href"
> & { to: Route };

export const InternalLink = forwardRef(InternalLinkImpl);
function InternalLinkImpl(
  { children, to, ...props }: InternalLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const internalLinkProps = useInternalLinkProps(RoutePath[to]);

  return (
    <Interaction
      component={NextLink<FullRoute>}
      icon={ArrowRight}
      {...internalLinkProps}
      /* @ts-expect-error NextLink's ref type can't be extracted by TS */
      ref={ref}
      {...props}
    >
      {children}
    </Interaction>
  );
}
