"use client";

import { animated } from "@react-spring/web";
import c from "classnames";
import { Context as ColorContext } from "client/providers/Color";
import React from "react";
import { Color } from "utils/theme";
import useTimedSpring from "client/useTimedSpring";
import styles from "./ActionBar.module.scss";

export default function ColorSelector({ color }: { color: Color }) {
  const { setColor, color: currentColor } = React.useContext(ColorContext);

  const [style, trigger] = useTimedSpring();

  const onClick = React.useCallback(() => {
    if (color === currentColor) {
      trigger({ rotation: -4, x: -4 });
    } else {
      trigger({ y: 3 });
      setColor(color);
    }
  }, [color, currentColor, setColor, trigger]);

  return (
    <animated.button
      style={style}
      className={c(styles.button, styles.colorSelector, color)}
      role="radio"
      aria-checked={color === currentColor}
      aria-label={color}
      onClick={onClick}
    />
  );
}
