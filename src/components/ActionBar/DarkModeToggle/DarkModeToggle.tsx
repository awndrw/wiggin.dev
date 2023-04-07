import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { useAtom } from "jotai";
import React from "react";
import { Moon, Sun } from "react-feather";

import { ActionName } from "analytics/constants";
import { Action } from "components/Action";
import { Icon } from "components/Icon";
import { modeAtom } from "store";

import styles from "./DarkModeToggle.module.scss";
import { ActionBarButton } from "../ActionBarButton";

export const DarkModeToggle = () => {
  const [mode, setMode] = useAtom(modeAtom);

  const nextMode = mode === "dark" ? "light" : "dark";

  return (
    <Action name={ActionName.SET_MODE} mode={nextMode}>
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
    </Action>
  );
};
