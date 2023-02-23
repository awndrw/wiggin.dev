import React from "react";
import { CustomHueContext } from "store/CustomHue";
import { HueContext } from "store/Hue";
import * as Popover from "@radix-ui/react-popover";
import * as Slider from "@radix-ui/react-slider";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./CustomHueSelector.module.scss";

export const CustomHueSelector: React.FC = () => {
  const { hue } = React.useContext(HueContext);
  const { showPopover, setShowPopover } = React.useContext(CustomHueContext);
  const triggerId = React.useId();

  return (
    <Popover.Root open={showPopover} onOpenChange={setShowPopover}>
      <ActionBarButton>
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
        </Popover.Trigger>
      </ActionBarButton>
      <Popover.Portal>
        <CustomHueSelectorPopover triggerId={triggerId} />
      </Popover.Portal>
    </Popover.Root>
  );
};

const CustomHueSelectorPopover = React.forwardRef<
  HTMLDivElement,
  { triggerId: string }
>(({ triggerId }, ref) => {
  const { hue, setHue } = React.useContext(HueContext);
  const [currentHue, setCurrentHue] = React.useState(hue);

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
          onValueCommit={([value]) => setHue(value)}
          onValueChange={([value]) => setCurrentHue(value)}
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
});
CustomHueSelectorPopover.displayName = "CustomHueSelectorPopover";
