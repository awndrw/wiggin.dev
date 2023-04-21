import NextLink from "next/link";
import React from "react";
import { ArrowRight, ArrowUpRight } from "react-feather";

import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";

export type InternalLinkProps<T extends string = string> =
  InteractionComponentProps<typeof NextLink<T>>;

export function InternalLink<T extends string = string>({
  children,
  ...props
}: InternalLinkProps<T>) {
  const Link = NextLink<T>;
  return (
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
