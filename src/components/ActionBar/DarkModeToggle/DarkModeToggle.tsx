import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { useAtom } from "jotai";
import React from "react";
import { Moon, Sun } from "react-feather";

import { Action } from "analytics/constants";
import { Icon } from "components/Icon";
import { Trigger } from "components/Trigger";
import { modeAtom } from "store";

import styles from "./DarkModeToggle.module.scss";
import { ActionBarButton } from "../ActionBarButton";

export const DarkModeToggle = () => {
  const [mode, setMode] = useAtom(modeAtom);

  const nextMode = mode === "dark" ? "light" : "dark";

  return (
    <Trigger action={Action.SET_MODE} mode={nextMode}>
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
    </Trigger>
  );
};
