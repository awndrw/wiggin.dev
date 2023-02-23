import { Interaction, type InteractionComponentProps } from "components/Interaction";
import { ArrowRight, ArrowUpRight } from "react-feather";
import React from "react";
import NextLink from "next/link";

export type InternalLinkProps = InteractionComponentProps<typeof NextLink>;

export const InternalLink: React.FC<InternalLinkProps> = ({
  children,
  ...props
}) => (
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
