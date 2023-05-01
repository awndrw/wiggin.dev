"use client";

import NextLink from "next/link";
import React from "react";
import { ArrowRight } from "react-feather";

import { type Route, type FullRoute } from ".types/routes";
import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";

import { useInternalLinkProps } from "./useInternalLinkProps";

export type InternalLinkProps = Omit<
  InteractionComponentProps<typeof NextLink<FullRoute>>,
  "href"
> & { href: Route };

export const InternalLink = React.forwardRef(InternalLinkImpl);
function InternalLinkImpl(
  { children, href, ...props }: InternalLinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  const internalLinkProps = useInternalLinkProps(href);

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
