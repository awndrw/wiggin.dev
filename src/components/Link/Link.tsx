import NextLink from "next/link";
import React from "react";

import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";
import { ArrowRight, ArrowUpRight } from "react-feather";

export type InternalLinkProps<T> = InteractionComponentProps<
  typeof NextLink<T>
>;

export const InternalLink = <T extends string>({
  children,
  ...props
}: InternalLinkProps<T>) => {
  const Link = NextLink<T>;
  return (
    <Interaction component={Link} icon={ArrowRight} {...props}>
      {children}
    </Interaction>
  );
};

export type ExternalLinkProps = InteractionComponentProps<"a">;

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  ...props
}) => (
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
