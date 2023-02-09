"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Icon } from "components/Icon";
import React from "react";
import { Context as ColorContext } from "client/providers/Color";
import { ActionBarButton } from "./ActionBarButton";
import styles from "./DarkModeToggle.module.scss";

export const DarkModeToggle = () => {
  const { mode, setMode } = React.useContext(ColorContext);

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
