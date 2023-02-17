"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { ActionBarButton } from "client/ActionBar/ActionBarButton";
import { Separator } from "client/radix/Separator";
import { Icon } from "components/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { COLORS } from "utils/theme";
import { DarkModeToggle } from "./DarkModeToggle";
import ColorSelector from "./ColorSelector";
import styles from "./ActionBar.module.scss";

export function ActionBar() {
  const pathname = usePathname() ?? "";

  const isNestedPage = pathname !== "/";
  const parentPath = pathname.slice(0, pathname.lastIndexOf("/") + 1);

  return (
    <section className={styles.container} aria-label="Action Bar">
      {isNestedPage && (
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
      )}
      <div aria-label="Theme selector" style={{ display: "contents" }}>
        {COLORS.map((color) => (
          <ColorSelector color={color} key={color} />
        ))}
      </div>
      <DarkModeToggle />
    </section>
  );
}
