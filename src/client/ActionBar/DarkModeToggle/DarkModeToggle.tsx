import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Icon } from "components/Icon";
import React from "react";
import { ModeContext } from "store/Mode";
import { Moon, Sun } from "react-feather";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./DarkModeToggle.module.scss";

export const DarkModeToggle = () => {
  const { mode, setMode } = React.useContext(ModeContext);

  const nextMode = mode === "dark" ? "light" : "dark";

  return (
    <ActionBarButton accentColor="var(--color-text-primary)">
      <button
        className={styles.darkModeToggle}
        onClick={() => setMode(nextMode)}
      >
        <AccessibleIcon label={`Set ${nextMode} mode`}>
          <Icon icon={mode === "dark" ? Moon : Sun} />
        </AccessibleIcon>
      </button>
    </ActionBarButton>
  );
};
