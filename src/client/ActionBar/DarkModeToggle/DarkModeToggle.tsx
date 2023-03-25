import React from "react";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Action } from "components/Action";
import { Icon } from "components/Icon";
import { useAtom } from "jotai";
import { Moon, Sun } from "react-feather";
import { modeAtom } from "store";
import { ActionName } from "utils/rum";

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
