import { a } from "@react-spring/web";
import cx from "classnames";
import { useAtom } from "jotai";

import { trackAction } from "analytics";
import { Action } from "analytics/constants";
import { hueAtom } from "store/client";
import { type Hue } from "theme/constants";

import styles from "./HueSelector.module.scss";
import useTimedSpring from "./useTimedSpring";

export function HueSelector({
  hue,
  className,
}: {
  hue: Hue;
  className?: string;
}) {
  const [style, trigger] = useTimedSpring();
  const [currentHue, setHue] = useAtom(hueAtom);

  const onClick = () => {
    if (hue === currentHue) {
      trigger({ rotation: -4, x: -4 });
    } else {
      trackAction(Action.SET_HUE);
      trigger({ y: 3 });
    }
    setHue(hue);
  };

  return (
    <a.button
      style={style}
      className={cx(styles.hueSelector, className)}
      // TODO: figure out aria-pressed without state
      aria-pressed={hue === currentHue}
      aria-label={`Hue: ${hue}`}
      onClick={onClick}
    />
  );
}
