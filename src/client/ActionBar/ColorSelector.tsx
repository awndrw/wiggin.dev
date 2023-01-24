"use client";

import { animated } from "@react-spring/web";
import c from "classnames";
import { Context as ColorContext } from "client/providers/Color";
import React from "react";
import { Color } from "utils/theme";
import useTimedSpring from "client/useTimedSpring";
import styles from "./ActionBar.module.scss";

export default function ColorSelector({ color }: { color: Color }) {
  const [style, trigger] = useTimedSpring();
  const { color: currentColor, setColor } = React.useContext(ColorContext);

  const onClick = React.useCallback(() => {
    setColor(color);
    if (color === currentColor) {
      trigger({ rotation: -4, x: -4 });
    } else {
      trigger({ y: 3 });
    }
  }, [color, currentColor, setColor, trigger]);

  return (
    <animated.button
      style={style}
      className={c(styles.button, styles.colorSelector)}
      data-color={color}
      // TODO: figure out aria-pressed without state
      aria-pressed={color === currentColor}
      aria-label={color}
      onClick={onClick}
    />
  );
}
