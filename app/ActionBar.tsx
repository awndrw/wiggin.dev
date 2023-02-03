import { DarkModeToggle } from "client/ActionBar/DarkModeToggle";
import React from "react";
import NavButton from "client/ActionBar/NavButton";
import ColorSelector from "client/ActionBar/ColorSelector";
import { COLORS } from "utils/theme";
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
