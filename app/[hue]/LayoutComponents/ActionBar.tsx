import React from "react";

import { BackHomeLink } from "components/ActionBar/BackHomeLink";
import { DarkModeToggle } from "components/ActionBar/DarkModeToggle";
import { HueSelector } from "components/ActionBar/HueSelector";
import { type Hue } from "theme/constants";

import styles from "./ActionBar.module.scss";

export function ActionBar({ presetHues }: { presetHues: Hue[] }) {
  return (
    <div className={styles.container}>
      <section className={styles.actionbar} aria-label="Action Bar">
        <BackHomeLink
          wrapperClassName={styles.buttonWrapper}
          className={styles.button}
        />
        <div aria-label="Theme selector" style={{ display: "contents" }}>
          {presetHues.map((hue) => (
            <div className={styles.buttonWrapper} data-hue={hue} key={hue}>
              <HueSelector hue={hue} className={styles.button} />
            </div>
          ))}
          <div className={styles.buttonWrapper}>
            <DarkModeToggle className={styles.button} />
          </div>
        </div>
      </section>
    </div>
  );
}
