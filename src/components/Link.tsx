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
  srOnly?: boolean;
}

export default function Link({
  href,
  type = "internal",
  className,
  children,
  srOnly = false,
  ...linkProps
}: LinkProps) {
  const LinkComponent = type === "internal" ? NextLink : "a";
  const linkComponentProps = {
    ...linkProps,
    href,
    title: typeof children === "string" ? children : undefined,
  };

  if (srOnly) {
    return <LinkComponent {...linkComponentProps}>{children}</LinkComponent>;
  }

  return (
    <LinkComponent
      {...linkComponentProps}
      className={c(styles.link, className)}
    >
      {children}
      <Icon
        iconName={type === "internal" ? "arrow-right" : "arrow-up-right"}
        className={styles.icon}
        aria-hidden
        focusable={false}
      />
    </LinkComponent>
  );
}
