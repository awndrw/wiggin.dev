"use client";

import { COLORS } from "utils/theme";
import React from "react";
import styles from "./Palettes.module.scss";

const palettes = {
  primary: [styles.primary, styles.primaryContrast],
  container: [styles.secondary, styles.secondaryContrast],
  tint: [styles.tertiary, styles.tertiaryContrast],
} as const;

export const Palettes = () => {
  return (
    <div className={styles.palettes}>
      {Object.entries(palettes).map(([name, colorClasses]) => (
        <div className={styles.palette} key={name}>
          <div>
            {COLORS.map((color) => (
              <React.Fragment key={color}>
                <span data-color={color} className={colorClasses[0]} />
                <span data-color={color} className={colorClasses[1]} />
              </React.Fragment>
            ))}
          </div>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};
