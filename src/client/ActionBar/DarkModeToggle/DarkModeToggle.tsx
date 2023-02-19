import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Icon } from "components/Icon";
import React from "react";
import { ModeContext } from "theme/Mode";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./DarkModeToggle.module.scss";

export const DarkModeToggle = () => {
  const { mode, setMode } = React.useContext(ModeContext);

  const nextMode = mode === "dark" ? "light" : "dark";

  return (
    <ActionBarButton focusArrowClassName={styles.focusArrow}>
      <button
        className={styles.darkModeToggle}
        onClick={() => setMode(nextMode)}
      >
        <AccessibleIcon label={`Set ${nextMode} mode`}>
          <Icon iconName={mode === "dark" ? "moon" : "sun"} />
        </AccessibleIcon>
      </button>
    </ActionBarButton>
  );
};
