import React from "react";

import { a } from "@react-spring/web";
import { ActionName } from "analytics/constants";
import { Action } from "components/Action";
import { useAtom } from "jotai";
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
      trigger({ y: 3 });
    }
    setHue(hue);
  };

  return (
    <Action
      name={ActionName.SET_HUE}
      hue={hue}
      preset={true}
      canceled={hue === currentHue}
    >
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
    </Action>
  );
}
