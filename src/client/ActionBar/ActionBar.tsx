"use client";

import React from "react";
import { COLORS } from "utils/theme";
import { DarkModeToggle } from "./DarkModeToggle";
import NavButton from "./NavButton";
import ColorSelector from "./ColorSelector";
import styles from "./ActionBar.module.scss";

export function ActionBar() {
  return (
    <div className={styles.container}>
      <section aria-label="Action Bar" className={styles.actionbar}>
        <NavButton />
        <div aria-label="Theme selector" style={{ display: "contents" }}>
          {COLORS.map((color) => (
            <ColorSelector color={color} key={color} />
          ))}
        </div>
        <DarkModeToggle />
      </section>
    </div>
  );
}
