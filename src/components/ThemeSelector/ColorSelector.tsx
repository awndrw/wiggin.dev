"use client";

import React from "react";
import { Color } from "utils/theme";
import { Context as ColorContext } from "components/Providers/Color";
import c from "classnames";
import styles from "./ColorSelector.module.scss";

export default function ColorSelector({ color }: { color: Color }) {
  const { getColor, setColor } = React.useContext(ColorContext);

  const handleClick = () => {
    if (color === getColor()) {
      return;
    }
    setColor(color);
  };

  return <button className={c(styles.button, color)} onClick={handleClick} />;
}
