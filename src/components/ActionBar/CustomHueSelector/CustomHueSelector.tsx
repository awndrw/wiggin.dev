import * as Popover from "@radix-ui/react-popover";
import * as Slider from "@radix-ui/react-slider";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

import { trackAction } from "analytics";
import { ActionName } from "analytics/constants";
import { Action } from "components/Action";
import { customHuePopoverAtom, hueAtom } from "store";
import { isHue } from "theme/constants";

import styles from "./CustomHueSelector.module.scss";
import { ActionBarButton } from "../ActionBarButton";

export const CustomHueSelector: React.FC = () => {
  const hue = useAtomValue(hueAtom);
  const [showPopover, setShowPopover] = useAtom(customHuePopoverAtom);
  const triggerId = React.useId();

  return (
    <Popover.Root open={showPopover} onOpenChange={setShowPopover}>
      <Action name={ActionName.TOGGLE_HUE_SLIDER} source="actionbar">
        <ActionBarButton className={styles.wrapper}>
          <Popover.Trigger
            id={triggerId}
            aria-label="Custom hue selector"
            className={styles.customHueSelector}
          >
            <div
              style={{ transform: `rotate(${hue}deg)` }}
              className={styles.customHueSelectorIndicator}
            >
              <div
                style={{ transform: `rotate(-${hue}deg)` }}
                className={styles.customHueSelectorIndicatorInner}
              />
            </div>
            <div className={styles.focusIndicator}>
              <div className={styles.focusIndicatorInner} />
            </div>
          </Popover.Trigger>
        </ActionBarButton>
      </Action>
      <Popover.Portal>
        <CustomHueSelectorPopover triggerId={triggerId} />
      </Popover.Portal>
    </Popover.Root>
  );
};

const CustomHueSelectorPopover = React.forwardRef(CustomHueSelectorPopoverImpl);
function CustomHueSelectorPopoverImpl(
  { triggerId }: { triggerId: string },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [hue, setHue] = useAtom(hueAtom);
  const [currentHue, setCurrentHue] = React.useState(hue);

  React.useEffect(() => {
    setCurrentHue(hue);
  }, [hue]);

  const onSet = (value: number) => {
    if (!isHue(value)) return;
    setHue(value);
    trackAction(ActionName.SET_HUE, { hue: value, preset: false });
  };

  return (
    <Popover.Portal>
      <Popover.Content
        side="top"
        sideOffset={6}
        className={styles.popoverContent}
        ref={ref}
        aria-labelledby={triggerId}
      >
        <Slider.Root
          defaultValue={[hue]}
          max={360}
          step={1}
          aria-label="Hue slider"
          value={[currentHue]}
          onValueCommit={([value]) => onSet(value)}
          onValueChange={([value]) => isHue(value) && setCurrentHue(value)}
          className={styles.sliderRoot}
        >
          <Slider.Track className={styles.sliderTrack} />
          <Slider.Thumb className={styles.sliderThumb} />
        </Slider.Root>
        <output className={styles.output}>{currentHue}º</output>
        <Popover.Arrow className={styles.popoverArrow} />
      </Popover.Content>
    </Popover.Portal>
  );
}
