import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Icon } from "components/Icon";
import React from "react";
import { Edit2 } from "react-feather";
import { HueContext } from "theme/Hue";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./HueSelector.module.scss";

export const HueSelector = () => {
  const { hue, setHue } = React.useContext(HueContext);
  const [value, setValue] = React.useState(() => hue);
  const [showPopover, setShowPopover] = React.useState(false);

  const updateHue = (e: React.MouseEvent<HTMLInputElement>) => {
    setHue((e.target as HTMLInputElement).valueAsNumber);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  return (
    <div className={styles.container}>
      <ActionBarButton>
        <button
          onClick={() => setShowPopover(true)}
          className={styles.hueSelector}
        >
          <AccessibleIcon label="">
            <Icon icon={Edit2} />
          </AccessibleIcon>
        </button>
      </ActionBarButton>
      {showPopover && (
        <div className={styles.popoverContent}>
          <input
            type="range"
            min={0}
            max={360}
            step={10}
            value={value}
            onChange={onChange}
            onMouseUp={updateHue}
          />
        </div>
      )}
    </div>
  );
};
