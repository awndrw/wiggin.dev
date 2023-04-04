import { type Route } from "next";
import NextLink from "next/link";
import React from "react";

import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";
import { type Locale } from "i18n/constants";
import { ArrowRight, ArrowUpRight } from "react-feather";

type NextLinkHref<T extends string = string> = T extends "/"
  ? "/"
  : `/${Locale}${T}` extends Route<`/${Locale}${T}`>
  ? T
  : never;

export type InternalLinkProps<T extends string = string> = Omit<
  InteractionComponentProps<typeof NextLink<T>>,
  "href"
> & {
  href: NextLinkHref<T>;
};

export function InternalLink<T extends string = string>({
  children,
  ...props
}: InternalLinkProps<T>) {
  const Link = NextLink<T>;
  return (
    // @ts-expect-error: typed routes do not support internationalization
    <Interaction component={Link} icon={ArrowRight} {...props}>
      {children}
    </Interaction>
  );
}

export type ExternalLinkProps = InteractionComponentProps<"a">;

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <Interaction
      component="a"
      icon={ArrowUpRight}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </Interaction>
  );
}
