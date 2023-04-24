import NextLink from "next/link";
import React from "react";
import { ArrowRight, ArrowUpRight } from "react-feather";

import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";

export type InternalLinkProps<T extends string> = InteractionComponentProps<
  typeof NextLink<T>
>;
export const InternalLink = React.forwardRef(InternalLinkImpl);
function InternalLinkImpl<T extends string>(
  { children, ...props }: InternalLinkProps<T>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    // @ts-expect-error NextLink accepts an HTMLAnchorElement ref but Interaction doesn't understand this
    <Interaction component={NextLink<T>} icon={ArrowRight} ref={ref} {...props}>
      {children}
    </Interaction>
  );
}

export type ExternalLinkProps = InteractionComponentProps<"a">;
export const ExternalLink = React.forwardRef(ExternalLinkImpl);
function ExternalLinkImpl(
  { children, ...props }: ExternalLinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Interaction
      component="a"
      icon={ArrowUpRight}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      {...props}
    >
      {children}
    </Interaction>
  );
}
