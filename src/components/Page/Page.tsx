import cx from "classnames";
import { type FC, type HTMLAttributes, type ReactNode } from "react";

import styles from "components/Page/Page.module.scss";

export interface PageProps extends HTMLAttributes<HTMLElement> {
  withAffordance?: boolean;
  children?: ReactNode;
}

export const Page: FC<PageProps> = ({
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
