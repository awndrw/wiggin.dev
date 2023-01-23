import c from "classnames";
import { Icon } from "components/Icon";
import { InternalLink } from "components/InternalLink";
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
      <InternalLink
        href={href}
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
      </InternalLink>
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
