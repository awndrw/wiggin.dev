import React from "react";
import { ArrowUpRight } from "react-feather";

import {
  Interaction,
  type InteractionComponentProps,
} from "components/Interaction";

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
