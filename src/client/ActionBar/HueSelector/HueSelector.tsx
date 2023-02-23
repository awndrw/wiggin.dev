import { a } from "@react-spring/web";
import React from "react";
import { HueContext } from "store/Hue";
import useTimedSpring from "client/useTimedSpring";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./HueSelector.module.scss";

export function HueSelector({ hue }: { hue: number }) {
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
