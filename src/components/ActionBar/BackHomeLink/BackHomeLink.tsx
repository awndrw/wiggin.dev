import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import Link from "next/link";
import { type FC } from "react";
import { Home } from "react-feather";

import { Icon } from "components/Icon";
import { useInternalLinkProps, usePathname } from "components/Link";
import { Separator } from "components/Separator";

import styles from "./BackHomeLink.module.scss";

export interface BackHomeLinkProps {
  wrapperClassName?: string;
  className?: string;
}

export const BackHomeLink: FC<BackHomeLinkProps> = ({
  wrapperClassName,
  className,
}) => {
  const pathname = usePathname();
  const homeLinkProps = useInternalLinkProps("/");

  if (!pathname.match(/\/.+/)) {
    return null;
  }

  return (
    <>
      <div className={wrapperClassName}>
        <Link className={className} {...homeLinkProps}>
          <AccessibleIcon label="Home">
            <Icon icon={Home} />
          </AccessibleIcon>
        </Link>
      </div>
      <Separator
        orientation="vertical"
        decorative
        className={styles.separator}
      />
    </>
  );
};
