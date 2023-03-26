import React from "react";

import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";
import { Link } from "next-intl";
import { ArrowRight, ArrowUpRight } from "react-feather";

export type InternalLinkProps = InteractionComponentProps<typeof Link>;

export const InternalLink = ({ children, ...props }: InternalLinkProps) => {
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
