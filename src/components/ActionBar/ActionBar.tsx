import Link from "next/link";
import React from "react";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Separator } from "client/radix/Separator";
import { Icon } from "components/Icon";
import { usePathname } from "next-intl/client";
import { ArrowLeft } from "react-feather";
import { HUES } from "theme/constants";

import styles from "./ActionBar.module.scss";
import { ActionBarButton } from "./ActionBarButton";
import { CustomHueSelector } from "./CustomHueSelector";
import { DarkModeToggle } from "./DarkModeToggle";
import { HueSelector } from "./HueSelector";

const ActionBarLink = () => {
  const pathname = usePathname() ?? "";

  const isNestedPage = pathname !== "/";
  const parentPath = pathname.slice(0, pathname.lastIndexOf("/") + 1);

  return isNestedPage ? (
    <>
      <ActionBarButton>
        {/* @ts-expect-error: href isn't typed */}
        <Link href={parentPath} className={styles.navButton}>
          <AccessibleIcon label="Back">
            <Icon icon={ArrowLeft} />
          </AccessibleIcon>
        </Link>
      </ActionBarButton>
      <Separator
        orientation="vertical"
        decorative
        className={styles.separator}
      />
    </>
  ) : null;
};

export function ActionBar() {
  return (
    <section className={styles.container} aria-label="Action Bar">
      <ActionBarLink />
      <div aria-label="Theme selector" style={{ display: "contents" }}>
        {HUES.map((hue) => (
          <HueSelector hue={hue} key={hue} />
        ))}
        <CustomHueSelector />
        <DarkModeToggle />
      </div>
    </section>
  );
}
