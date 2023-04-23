import { a } from "@react-spring/web";
import { useAtom } from "jotai";
import React from "react";

import { trackAction } from "analytics";
import { Action } from "analytics/constants";
import { hueAtom } from "store";
import { type Hue } from "theme/constants";
import useTimedSpring from "utils/useTimedSpring";

import styles from "./HueSelector.module.scss";
import { ActionBarButton } from "../ActionBarButton";

export function HueSelector({ hue }: { hue: Hue }) {
  const [style, trigger] = useTimedSpring();
  const [currentHue, setHue] = useAtom(hueAtom);

  const onClick = () => {
    if (hue === currentHue) {
      trigger({ rotation: -4, x: -4 });
    } else {
      trackAction(Action.SET_HUE, { hue, preset: true });
      trigger({ y: 3 });
    }
    setHue(hue);
  };

  return (
    <ActionBarButton data-hue={hue}>
      <a.button
        style={style}
        className={styles.hueSelector}
        // TODO: figure out aria-pressed without state
        aria-pressed={hue === currentHue}
        aria-label={`Hue: ${hue}`}
        onClick={onClick}
      />
    </ActionBarButton>
  );
}
