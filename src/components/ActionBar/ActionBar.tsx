"use client";

import { Themed } from "components/Themed";
import React from "react";
import NavButton from "components/ActionBar/NavButton";
import styles from "./ActionBar.module.scss";
import AnimateSlideIn from "./AnimateSlideIn";
import ColorSelector from "./ColorSelector";

export function ActionBar() {
  const shouldRenderBackButton = 0;

  return (
    <Themed>
      <AnimateSlideIn className={styles.container}>
        <div role="region" aria-label="Action Bar" className={styles.actionbar}>
          <NavButton />
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
