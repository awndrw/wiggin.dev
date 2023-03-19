"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Separator } from "client/radix/Separator";
import { Icon } from "components/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ArrowLeft } from "react-feather";
import { HUES } from "theme/constants";
import { CustomHueSelector } from "./CustomHueSelector";
import { ActionBarButton } from "./ActionBarButton";
import { DarkModeToggle } from "./DarkModeToggle";
import { HueSelector } from "./HueSelector";
import styles from "./ActionBar.module.scss";

const ActionBarLink = () => {
  const pathname = usePathname() ?? "";

  const isNestedPage = pathname !== "/";
  const parentPath = pathname.slice(0, pathname.lastIndexOf("/") + 1);

  return isNestedPage ? (
    <>
      <ActionBarButton>
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
