import React from "react";

import { BackHomeLink } from "components/ActionBar/BackHomeLink";
import { Separator } from "components/external/radix/Separator";
import { HUES } from "theme/constants";

import styles from "./ActionBar.module.scss";
import { CustomHueSelector } from "./CustomHueSelector";
import { DarkModeToggle } from "./DarkModeToggle";
import { HueSelector } from "./HueSelector";

export function ActionBar() {
  return (
    <div className={styles.container}>
      <section className={styles.actionBar} aria-label="Action Bar">
        <BackHomeLink>
          <Separator
            orientation="vertical"
            decorative
            className={styles.separator}
          />
        </BackHomeLink>
        <div aria-label="Theme selector" style={{ display: "contents" }}>
          {HUES.map((hue) => (
            <HueSelector hue={hue} key={hue} />
          ))}
          <CustomHueSelector />
          <DarkModeToggle />
        </div>
      </section>
    </div>
  );
}
