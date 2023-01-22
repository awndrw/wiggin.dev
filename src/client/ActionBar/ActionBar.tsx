"use client";

import { Themed } from "client/Themed";
import { usePathname } from "next/navigation";
import React from "react";
import NavButton from "./NavButton";
import styles from "./ActionBar.module.scss";
import AnimateSlideIn from "./AnimateSlideIn";
import ColorSelector from "./ColorSelector";

export function ActionBar() {
  const pathname = usePathname();
  const shouldShowNavButton = pathname !== "/";

  return (
    <Themed>
      <AnimateSlideIn className={styles.container}>
        <div role="region" aria-label="Action Bar" className={styles.actionbar}>
          {shouldShowNavButton && <NavButton />}
          <div
            role="radiogroup"
            aria-label="Theme selector"
            style={{ display: "contents" }}
          >
            <ColorSelector color="neutral" />
            <ColorSelector color="red" />
            <ColorSelector color="green" />
            <ColorSelector color="blue" />
          </div>
        </div>
      </AnimateSlideIn>
    </Themed>
  );
}
