import React from "react";
import NextLink from "next/link";
import Icon from "./Icon";
import c from "classnames";
import styles from "./Link.module.scss";

type LinkType = "internal" | "external";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    React.PropsWithChildren {
  href: string;
  type?: LinkType;
}

export default function Link({
  href,
  type = "internal",
  className,
  children,
}: LinkProps) {
  const LinkComponent = type === "internal" ? NextLink : "a";
  const iconName = type === "internal" ? "arrow-right" : "arrow-up-right";

  return (
    <LinkComponent
      href={href}
      className={c(styles.link, className)}
      title={typeof children === "string" ? children : undefined}
    >
      {children}
      <Icon
        iconName={iconName}
        className={styles.icon}
        aria-hidden
        focusable={false}
      />
    </LinkComponent>
  );
}
