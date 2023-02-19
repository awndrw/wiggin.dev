"use client";

import { a } from "@react-spring/web";
import React from "react";
import { HueContext } from "theme/Hue";
import useTimedSpring from "client/useTimedSpring";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./ColorSelector.module.scss";

export function ColorSelector({ hue }: { hue: number }) {
  const [style, trigger] = useTimedSpring();
  const { hue: currentHue, setHue } = React.useContext(HueContext);

  const onClick = () => {
    if (hue === currentHue) {
      trigger({ rotation: -4, x: -4 });
    } else {
      trigger({ y: 3 });
    }
    setHue(hue);
  };

  return (
    <ActionBarButton>
      <a.button
        style={style}
        className={styles.colorSelector}
        data-hue={hue}
        // TODO: figure out aria-pressed without state
        aria-pressed={hue === currentHue}
        aria-label={`Hue: ${hue}`}
        onClick={onClick}
      />
    </ActionBarButton>
  );
}
