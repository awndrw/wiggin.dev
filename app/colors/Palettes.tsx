"use client";

import { COLORS } from "utils/theme";
import React from "react";
import styles from "./Palettes.module.scss";

const palettes = ["primary", "container", "tint"] as const;

export const Palettes = () => {
  return (
    <div className={styles.palettes}>
      {palettes.map((name) => (
        <div className={styles.palette} key={name}>
          <div>
            {COLORS.map((color) => (
              <React.Fragment key={color}>
                <span
                  data-color={color}
                  className={styles.tone}
                  style={{ backgroundColor: `var(--color-accent-${name})` }}
                />
                <span
                  data-color={color}
                  className={styles.tone}
                  style={{
                    backgroundColor: `var(--color-accent-${name}-contrast)`,
                  }}
                />
              </React.Fragment>
            ))}
          </div>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};
