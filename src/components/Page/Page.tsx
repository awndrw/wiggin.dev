import React from "react";

import cx from "classnames";
import styles from "components/Page/Page.module.scss";

export interface PageProps extends React.HTMLAttributes<HTMLElement> {
  withAffordance?: boolean;
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
  withAffordance = true,
  className,
  children,
  ...props
}) => {
  const classNames = cx(styles.page, className, {
    [styles.withAffordance]: withAffordance,
  });
  return (
    <main className={classNames} {...props}>
      {children}
    </main>
  );
};
