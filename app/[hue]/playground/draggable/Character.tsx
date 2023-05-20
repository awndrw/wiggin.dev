"use client";

import { useSpring, a } from "@react-spring/web";
import { useGesture, type Vector2 } from "@use-gesture/react";
import { type FC, useId, createRef, useState } from "react";

import styles from "./Character.module.scss";

export const Character: FC<{
  children: string;
  registerReset: (id: string, reset: () => void) => void;
}> = ({ children, registerReset }) => {
  const id = useId();
  const spanRef = createRef<HTMLButtonElement>();
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const [currentPosition, setCurrentPosition] = useState<Vector2>([0, 0]);
  const [dragging, setDragging] = useState(false);

  useGesture(
    {
      onDrag: ({ delta: [dx, dy] }) => {
        const newX = currentPosition[0] + dx;
        const newY = currentPosition[1] + dy;
        registerReset(id, () => {
          api.start({ x: 0, y: 0 });
          setCurrentPosition([0, 0]);
        });
        api.start({
          x: newX,
          y: newY,
          immediate: true,
        });
        setCurrentPosition([newX, newY]);
      },
      onMouseDown: () => setDragging(true),
      onMouseUp: () => setDragging(false),
    },
    { target: spanRef, drag: { filterTaps: true } }
  );

  return (
    <span className={styles.container}>
      <a.span
        ref={spanRef}
        tabIndex={0}
        style={{ x, y, cursor: dragging ? "grabbing" : "grab" }}
        className={styles.character}
      >
        {children}
      </a.span>
      <span className={styles.shadow} aria-hidden>
        {children}
      </span>
    </span>
  );
};
