import { useAtomValue } from "jotai";

import { type User } from "live/types";
import { useStore } from "live/useStore";
import { modeAtom } from "store";
import { getHexForColor } from "theme/server";

import styles from "./User.module.scss";

export function User({ id }: { id: User["id"] }) {
  const { hue } = useStore((store) => store[id]);
  const mode = useAtomValue(modeAtom);

  const primary = hue ? getHexForColor(hue, mode, "primary") : undefined;
  const contrast = hue
    ? getHexForColor(hue, mode, "primary-contrast")
    : undefined;

  return (
    <div
      className={styles.user}
      style={{
        borderColor: primary,
        backgroundColor: contrast,
      }}
    ></div>
  );
}
