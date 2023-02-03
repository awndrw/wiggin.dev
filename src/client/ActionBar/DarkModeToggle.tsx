"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Icon } from "components/Icon";
import React from "react";
import { ActionBarButton } from "./ActionBarButton";
import styles from "./DarkModeToggle.module.scss";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const setMode = (newIsDarkMode: boolean) => {
    document.body.setAttribute("data-mode", newIsDarkMode ? "dark" : "light");
    setIsDarkMode(newIsDarkMode);
  };

  return (
    <ActionBarButton focusArrowClassName={styles.focusArrow}>
      <button
        className={styles.darkModeToggle}
        onClick={() => setMode(!isDarkMode)}
      >
        <AccessibleIcon label={isDarkMode ? "Set light mode" : "Set dark mode"}>
          <Icon iconName={isDarkMode ? "moon" : "sun"} />
        </AccessibleIcon>
      </button>
    </ActionBarButton>
  );
};
