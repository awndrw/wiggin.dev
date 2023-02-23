import c from "classnames";
import { tragedyDisplay } from "fonts/tragedy";
import React from "react";
import { CustomHueContext } from "store/CustomHue";
import { HueContext } from "store/Hue";
import * as Popover from "@radix-ui/react-popover";
import * as Slider from "@radix-ui/react-slider";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./CustomColorSelector.module.scss";

export const CustomColorSelector: React.FC = () => {
  const { hue } = React.useContext(HueContext);
  const { showPopover, setShowPopover } = React.useContext(CustomHueContext);

  return (
    <Popover.Root open={showPopover} onOpenChange={setShowPopover}>
      <ActionBarButton>
        <Popover.Trigger className={styles.customColorSelector}>
          <div
            style={{ transform: `rotate(${hue}deg)` }}
            className={styles.customColorSelectorIndicator}
          >
            <div
              style={{ transform: `rotate(-${hue}deg)` }}
              className={styles.customColorSelectorIndicatorInner}
            />
          </div>
        </Popover.Trigger>
      </ActionBarButton>
      <Popover.Portal>
        <CustomColorSelectorPopover />
      </Popover.Portal>
    </Popover.Root>
  );
};

const CustomColorSelectorPopover = React.forwardRef<HTMLDivElement>(
  (_, ref) => {
    const { hue, setHue } = React.useContext(HueContext);
    const [currentHue, setCurrentHue] = React.useState(hue);

    return (
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={3}
          className={styles.popoverContent}
          ref={ref}
        >
          <Slider.Root
            defaultValue={[hue]}
            max={360}
            step={1}
            aria-label="Hue"
            onValueCommit={([value]) => setHue(value)}
            onValueChange={([value]) => setCurrentHue(value)}
            className={styles.sliderRoot}
          >
            <Slider.Track className={styles.sliderTrack} />
            <Slider.Thumb className={styles.sliderThumb} />
          </Slider.Root>
          <output className={c(styles.output, tragedyDisplay.className)}>
            {currentHue}º
          </output>
          <Popover.Arrow className={styles.popoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    );
  }
);
CustomColorSelectorPopover.displayName = "CustomColorSelectorPopover";
