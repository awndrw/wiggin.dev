import { Interaction, InteractionProps } from "components/Interaction";
import { ArrowRight, ArrowUpRight } from "react-feather";
import React from "react";
import NextLink from "next/link";

export type InternalLinkProps = Omit<
  InteractionProps<typeof NextLink>,
  "component" | "icon"
>;

export const InternalLink: React.FC<InternalLinkProps> = ({
  children,
  ...props
}) => (
  <Interaction component={NextLink} icon={ArrowRight} {...props}>
    {children}
  </Interaction>
);

export type ExternalLinkProps = Omit<
  InteractionProps<"a">,
  "component" | "icon"
>;
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
