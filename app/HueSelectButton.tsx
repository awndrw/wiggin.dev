"use client";

import * as Popover from "@radix-ui/react-popover";
import c from "classnames";
import { Interaction } from "components/Interaction";
import { hyenaSunrise } from "fonts/hyena";
import React from "react";
import { Target } from "react-feather";
import { HueContext } from "store/Hue";
import styles from "./HueSelectButton.module.scss";

export interface HueSelectButtonProps {
  children: React.ReactNode;
}

export const HueSelectButton: React.FC<HueSelectButtonProps> = ({
  children,
}) => {
  const { hue, setHue } = React.useContext(HueContext);
  const [inputValue, setInputValue] = React.useState(hue);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Interaction component="span" role="button" icon={Target}>
          {children}
        </Interaction>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={-12}
          className={styles.popoverContent}
        >
          <input
            type="range"
            min={0}
            max={360}
            id="hue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.valueAsNumber)}
            className={styles.popoverInput}
            onMouseUp={() => setHue(inputValue)}
            style={{
              // @ts-ignore
              "--hue": inputValue,
            }}
          />
          <output
            className={c(styles.popoverOutput, hyenaSunrise.className)}
            htmlFor="hue"
          >
            {inputValue}º
          </output>
          <Popover.Arrow className={styles.popoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
