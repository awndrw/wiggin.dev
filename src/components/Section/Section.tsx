import cx from "classnames";
import React from "react";

import { Separator } from "client/radix/Separator";

import styles from "./Section.module.scss";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  type?: "accent" | "neutral";
  bottomSeparator?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  type = "neutral",
  bottomSeparator = false,
  fullHeight = false,
  className,
  children,
  ...props
}) => {
  const classNames = cx(styles.section, className, {
    [styles.accent]: type === "accent",
    [styles.neutral]: type === "neutral",
    [styles.fullHeight]: fullHeight,
  });

  return (
    <>
      <section className={classNames} {...props}>
        {children}
      </section>
      {bottomSeparator && (
        <Separator
          orientation="horizontal"
          decorative
          className={styles.separator}
        />
      )}
    </>
  );
};
