import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import cx from "classnames";
import { useAtom } from "jotai";
import { type FC } from "react";
import { Moon, Sun } from "react-feather";

import { Action } from "analytics/constants";
import { Icon } from "components/Icon";
import { Trigger } from "components/Trigger";
import { modeAtom } from "store";

import styles from "./DarkModeToggle.module.scss";

export const DarkModeToggle: FC<{ className: string }> = ({ className }) => {
  const [mode, setMode] = useAtom(modeAtom);

  const nextMode = mode === "dark" ? "light" : "dark";

  return (
    <Trigger action={Action.SET_MODE} mode={nextMode}>
      <button
        className={cx(styles.darkModeToggle, className)}
        onClick={() => setMode(nextMode)}
      >
        <AccessibleIcon label={`Set ${nextMode} mode`}>
          <Icon icon={mode === "dark" ? Moon : Sun} />
        </AccessibleIcon>
      </button>
    </Trigger>
  );
};
