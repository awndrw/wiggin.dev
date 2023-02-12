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
    const onKeypress = (e: KeyboardEvent) => {
      const resets = Object.values(characterResets);
      if (e.key === "R" && e.shiftKey && resets.length > 0) {
        resets.forEach((reset, index) => {
          setTimeout(reset, 75 * index);
        });
        setCharacterResets({});
      }
    };
    window.addEventListener("keypress", onKeypress);
    return () => window.removeEventListener("keypress", onKeypress);
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
