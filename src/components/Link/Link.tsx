import c from "classnames";
import { Icon } from "components/Icon";
import { ArrowRight, ArrowUpRight } from "react-feather";
import React from "react";
import NextLink from "next/link";
import styles from "./Link.module.scss";

export const LinkType = {
  INTERNAL: "internal",
  EXTERNAL: "external",
} as const;
export type LinkType = (typeof LinkType)[keyof typeof LinkType];

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  type?: LinkType;
}

export function Link({
  href,
  type = "internal",
  className,
  children,
  target,
  rel,
  ...linkProps
}: LinkProps) {
  const icon = (
    <Icon
      icon={type === "internal" ? ArrowRight : ArrowUpRight}
      className={styles.icon}
      aria-hidden
      focusable={false}
    />
  );

  let content: React.ReactNode;
  if (typeof children === "string") {
    const words = children.split(" ");
    const lastWord = words.at(-1);
    const rest = words.slice(0, -1).join(" ");
    content = (
      <>
        {rest.length ? rest + " " : ""}
        <span style={{ display: "inline-block" }}>
          {lastWord}
          {icon}
        </span>
      </>
    );
  } else {
    content = (
      <>
        {children}
        {icon}
      </>
    );
  }

  if (type === "internal") {
    return (
      <NextLink
        href={href}
        className={c(styles.link, className)}
        {...linkProps}
      >
        {content}
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
        {content}
      </a>
    );
  }
}
