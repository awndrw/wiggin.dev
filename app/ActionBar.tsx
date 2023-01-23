import { Themed } from "client/Themed";
import React from "react";
import NavButton from "client/ActionBar/NavButton";
import ColorSelector from "client/ActionBar/ColorSelector";
import styles from "./ActionBar.module.scss";

export function ActionBar() {
  return (
    <Themed>
      <div className={styles.container}>
        <section aria-label="Action Bar" className={styles.actionbar}>
          <NavButton />
          <div aria-label="Theme selector" style={{ display: "contents" }}>
            <ColorSelector color="neutral" />
            <ColorSelector color="red" />
            <ColorSelector color="green" />
            <ColorSelector color="blue" />
          </div>
        </section>
      </div>
    </Themed>
  );
}
