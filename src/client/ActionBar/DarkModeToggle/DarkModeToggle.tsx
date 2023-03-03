import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Action } from "components/Action";
import { modeAtom } from "store";
import { Icon } from "components/Icon";
import { useAtom } from "jotai";
import React from "react";
import { Moon, Sun } from "react-feather";
import { ActionName } from "utils/rum";
import { ActionBarButton } from "../ActionBarButton";
import styles from "./DarkModeToggle.module.scss";

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
