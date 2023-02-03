import React from "react";
import { Color } from "utils/theme";
import styles from "./Swatch.module.scss";

export const Swatch: React.FC<{
  color: Color;
  style?: React.CSSProperties;
}> = ({ color, style }) => (
  <div data-color={color} className={styles.swatch} style={style}>
    <div className={styles.primaryContrast} />
    <div className={styles.secondaryContrast}>
      <div className={styles.secondary} />
    </div>
  </div>
);
