import NextLink from "next/link";
import React from "react";

import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";
import { ArrowRight, ArrowUpRight } from "react-feather";

export type InternalLinkProps = InteractionComponentProps<typeof NextLink>;

export const InternalLink = ({ children, ...props }: InternalLinkProps) => (
  <Interaction component={NextLink} icon={ArrowRight} {...props}>
    {children}
  </Interaction>
);

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
