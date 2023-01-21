import c from "classnames";
import { Icon } from "components/Icon";
import NextLink from "next/link";
import React from "react";
import styles from "./Link.module.scss";

export const LinkType = {
  INTERNAL: "internal",
  EXTERNAL: "external",
} as const;
export type LinkType = (typeof LinkType)[keyof typeof LinkType];

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    React.PropsWithChildren {
  href: string;
  type?: LinkType;
  srOnly?: boolean;
}

export function Link({
  href,
  type = "internal",
  className,
  children,
  srOnly = false,
  target,
  rel,
  ...linkProps
}: LinkProps) {
  if (type === "internal") {
    return (
      <NextLink
        href={{
          pathname: href,
          query: { ref: "internal" },
        }}
        scroll={false}
        className={c(styles.link, className)}
        {...linkProps}
      >
        {children}
        <Icon
          iconName="arrow-right"
          className={styles.icon}
          aria-hidden
          focusable={false}
        />
      </NextLink>
    );
  } else {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noreferrer"}
        className={c(styles.link, className)}
        {...linkProps}
      >
        {children}
        <Icon
          iconName="arrow-up-right"
          className={styles.icon}
          aria-hidden
          focusable={false}
        />
      </a>
    );
  }
}
