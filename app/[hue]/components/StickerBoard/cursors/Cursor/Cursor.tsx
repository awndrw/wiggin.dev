import { useAtomValue } from "jotai";

import { useStore } from "live/useStore";
import { type Cursor } from "stickerboard/constants";
import { modeAtom } from "store";
import { getHexForColor } from "theme/server";

import styles from "./Cursor.module.scss";

export interface CursorProps {
  id: Cursor["id"];
}

export function Cursor({ id }: CursorProps) {
  const mode = useAtomValue(modeAtom);
  const { cursor, hue } = useStore((store) => store[id]);

  if (!cursor) {
    return null;
  }

  const x = cursor.position.x * document.body.clientWidth;
  const y = cursor.position.y * document.body.clientHeight;

  const primary = hue ? getHexForColor(hue, mode, "primary") : undefined;
  const contrast = hue
    ? getHexForColor(hue, mode, "primary-contrast")
    : undefined;

  return (
    <div
      className={styles.cursor}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        fill: contrast,
        stroke: primary,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 104 99" xmlns="http://www.w3.org/2000/svg">
        <path d="M101.529 24.366L2.51114 0.712849C0.908162 0.329931 -0.444015 1.94139 0.211444 3.45354L40.6994 96.8594C41.4638 98.6228 44.0332 98.3981 44.4797 96.5286L56.0739 47.9925L101.859 28.1463C103.623 27.3819 103.398 24.8125 101.529 24.366Z" />
      </svg>
    </div>
  );
}
