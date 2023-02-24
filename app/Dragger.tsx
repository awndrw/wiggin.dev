"use client";

import React from "react";
import styles from "./Dragger.module.scss";

const INITIAL_POS = { x: -1, y: -1 };
const INITIAL_SIZE = { x: 0, y: 0 };

export const Dragger = () => {
  const [dragging, setDragging] = React.useState(false);
  const [startPos, setStartPos] = React.useState(INITIAL_POS);
  const [activePos, setActivePos] = React.useState(INITIAL_POS);

  React.useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      setDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      setActivePos({ x: e.clientX, y: e.clientY });
    };
    const onMouseUp = () => {
      setDragging(false);
      setStartPos(INITIAL_POS);
      setActivePos(INITIAL_POS);
    };
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e: MouseEvent) => {
      setActivePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [dragging, startPos]);

  const distanceX = activePos.x - startPos.x;
  const distanceY = activePos.y - startPos.y;
  const x = distanceX < 0 ? startPos.x + distanceX : startPos.x;
  const y = distanceY < 0 ? startPos.y + distanceY : startPos.y;

  return (
    <div className={styles.wrapper} aria-hidden>
      <div
        className={styles.dragger}
        style={{
          top: y,
          left: x,
          height: Math.abs(distanceY),
          width: Math.abs(distanceX),
        }}
      />
    </div>
  );
};
