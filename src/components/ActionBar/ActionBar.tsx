"use client";

import Themed from "components/Themed";
import React from "react";
import styles from "./ActionBar.module.scss";
import AnimateSlideIn from "./AnimateSlideIn";
import BackButton from "./BackButton";
import ColorSelector from "./ColorSelector";

export default function ActionBar() {
  return (
    <Themed>
      <AnimateSlideIn className={styles.container}>
        <div role="region" aria-label="Action Bar" className={styles.actionbar}>
          <BackButton />
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
