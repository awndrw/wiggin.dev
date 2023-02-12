"use client";

import React from "react";
import { flexaMono } from "fonts";
import * as Toast from "@radix-ui/react-toast";
import { Character } from "./Character";
import styles from "./Paragraph.module.scss";

export const Paragraph = ({ children }: { children: string }) => {
  const [characterResets, setCharacterResets] = React.useState<
    Record<string, () => void>
  >({});
  const hasDraggedCharacters = React.useMemo(
    () => Object.keys(characterResets).length > 0,
    [characterResets]
  );

  React.useEffect(() => {
    const reset = () => {
      Object.values(characterResets).forEach((reset, index) => {
        setTimeout(reset, 75 * index);
      });
      setCharacterResets({});
    };
    if ("ontouchstart" in window) {
      const onDoubleTap = () => {
        reset();
      };
      window.addEventListener("dblclick", onDoubleTap);
      return () => window.removeEventListener("dblclick", onDoubleTap);
    } else {
      const onKeypress = (e: KeyboardEvent) => {
        if (e.key === "R" && e.shiftKey) {
          reset();
        }
      };
      window.addEventListener("keypress", onKeypress);
      return () => window.removeEventListener("keypress", onKeypress);
    }
  }, [characterResets]);

  const words = children.split(" ");
  return (
    <Toast.Provider>
      <ResetMessage visible={hasDraggedCharacters} />
      <p className={styles.paragraph} aria-label={children}>
        {words.map((word, wordIndex) => {
          const characters = word.split("");
          return (
            <React.Fragment key={wordIndex}>
              <span className={styles.word}>
                {characters.map((character, characterIndex) => (
                  <Character
                    registerReset={(id, reset) =>
                      setCharacterResets((resets) => {
                        if (resets[id]) return resets;
                        return {
                          ...resets,
                          [id]: reset,
                        };
                      })
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
      <Toast.Viewport className={styles.resetMessageViewport} />
    </Toast.Provider>
  );
};

const ResetMessage = ({ visible }: { visible: boolean }) => {
  const [isTouchScreen] = React.useState(() => "ontouchstart" in window);
  return (
    <Toast.Root open={visible} className={styles.resetMessage}>
      <Toast.Description asChild>
        {isTouchScreen ? (
          <span>double tap anywhere to reset</span>
        ) : (
          <span>
            press <kbd className={flexaMono.className}>shift</kbd> +{" "}
            <kbd className={flexaMono.className}>r</kbd> to reset
          </span>
        )}
      </Toast.Description>
    </Toast.Root>
  );
};
