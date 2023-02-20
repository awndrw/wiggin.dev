"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Separator } from "client/radix/Separator";
import { Icon } from "components/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HUES } from "utils/theme/color";
import { ActionBarButton } from "./ActionBarButton";
import { DarkModeToggle } from "./DarkModeToggle";
import { ColorSelector } from "./ColorSelector";
import styles from "./ActionBar.module.scss";

const ActionBarLink = () => {
  const pathname = usePathname() ?? "";

  const isNestedPage = pathname !== "/";
  const parentPath = pathname.slice(0, pathname.lastIndexOf("/") + 1);

  return isNestedPage ? (
    <>
      <ActionBarButton focusArrowClassName={styles.focusArrow}>
        <Link href={parentPath} className={styles.navButton}>
          <AccessibleIcon label="Back">
            <Icon iconName="arrow-left" />
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
          <ColorSelector hue={hue} key={hue} />
        ))}
        <DarkModeToggle />
      </div>
    </section>
  );
}
