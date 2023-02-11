"use client";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React from "react";
import styles from "./Paragraph.module.scss";

export const Paragraph = ({ children }: { children: string }) => {
  const [hasDraggedCharacters, setHasDraggedCharacters] = React.useState(false);
  const characterRefs = React.useRef<Set<CharacterRef>>(new Set());

  React.useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === "R" && e.shiftKey && hasDraggedCharacters) {
        characterRefs.current.forEach((characterRef) => characterRef.reset());
      }
    };
    window.addEventListener("keypress", onKeypress);
    return () => window.removeEventListener("keypress", onKeypress);
  }, [hasDraggedCharacters]);

  const words = children.split(" ");
  return (
    <p>
      {words.map((word, wordIndex) => {
        const characters = word.split("");
        return (
          <React.Fragment key={wordIndex}>
            <span className={styles.word}>
              {characters.map((character, characterIndex) => (
                <Character
                  ref={(ref) => ref && characterRefs.current.add(ref)}
                  setDragged={() =>
                    !hasDraggedCharacters && setHasDraggedCharacters(true)
                  }
                  key={characterIndex}
                >
                  {character}
                </Character>
              ))}
            </span>
            <span>&nbsp;</span>
          </React.Fragment>
        );
      })}
    </p>
  );
};

interface CharacterRef {
  reset: () => void;
}

interface CharacterProps {
  children: string;
  setDragged: () => void;
}

const Character = React.forwardRef<CharacterRef, CharacterProps>(
  ({ children, setDragged }, ref) => {
    const spanRef = React.createRef<HTMLSpanElement>();
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

    React.useImperativeHandle(
      ref,
      () => ({
        reset: () => api.start({ x: 0, y: 0 }),
      }),
      [api]
    );

    useDrag(
      ({ offset: [ox, oy] }) => {
        setDragged();
        api.start({ x: ox, y: oy, immediate: true });
      },
      { target: spanRef, filterTaps: true }
    );

    React.useEffect(() => {
      const span = spanRef.current;
      if (!span) return;
      const onClick = () => api.start({ x: 0, y: 0 });
      span.addEventListener("dblclick", onClick);
      return () => span.removeEventListener("dblclick", onClick);
    }, [api, spanRef]);

    return (
      <span className={styles.characterContainer}>
        <animated.span
          ref={spanRef}
          style={{ x, y }}
          className={styles.character}
        >
          {children}
        </animated.span>
        <span className={styles.shadow}>{children}</span>
      </span>
    );
  }
);

Character.displayName = "Character";
