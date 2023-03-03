import { a } from "@react-spring/web";
import { Action } from "components/Action";
import { hueAtom } from "store";
import { useAtom } from "jotai";
import React from "react";
import { ActionName } from "utils/rum";
import useTimedSpring from "utils/useTimedSpring";
import { type Hue } from "utils/theme/color";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./HueSelector.module.scss";

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
    <Action name={ActionName.SET_HUE} hue={hue} preset={true}>
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
