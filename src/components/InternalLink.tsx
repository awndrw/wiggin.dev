import React from "react";
import NextLink from "next/link";

type NextLinkProps = React.ComponentProps<typeof NextLink>;

export interface InternalLinkProps extends NextLinkProps {
  href: string;
}

export const InternalLink: React.FC<InternalLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={{ pathname: href, query: { ref: "internal" } }} {...props}>
      {children}
    </NextLink>
  );
};
