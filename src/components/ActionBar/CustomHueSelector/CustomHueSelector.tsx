import * as Popover from "@radix-ui/react-popover";
import * as Slider from "@radix-ui/react-slider";
import cx from "classnames";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

import { trackAction } from "analytics";
import { Action, EventData } from "analytics/constants";
import { customHuePopoverAtom, hueAtom } from "store";
import { isHue } from "theme/constants";

import styles from "./CustomHueSelector.module.scss";

export const CustomHueSelector: React.FC<{ className: string }> = ({
  className,
}) => {
  const hue = useAtomValue(hueAtom);
  const [showPopover, setShowPopover] = useAtom(customHuePopoverAtom);
  const triggerId = React.useId();

  return (
    <Popover.Root open={showPopover} onOpenChange={setShowPopover}>
      <Popover.Trigger
        id={triggerId}
        aria-label="Custom hue selector"
        className={cx(styles.customHueSelector, className)}
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
    trackAction(Action.SET_HUE, {
      hue: value,
      preset: EventData.Boolean.FALSE,
    });
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
