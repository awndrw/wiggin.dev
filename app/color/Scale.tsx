"use client";

import better from "better-color-tools";
import React from "react";
import { HUES } from "utils/theme/color";
import styles from "./Scale.module.scss";

const lightnesses: number[] = [];
for (let i = 0; i < 1; i += 0.1) {
  lightnesses.push(i);
}
const chromas: number[] = [];
for (let i = 0; i < 1; i += 0.1) {
  chromas.push(i);
}
const hues: number[] = [];
for (let i = 0; i < 360; i += 36) {
  hues.push(i);
}

type ScaleProps = {
  lightness: number;
  chroma: number;
};
const Scale: React.FC<ScaleProps> = ({ lightness, chroma }) => {
  return (
    <div className={styles.scale}>
      {HUES.map((hue) => {
        const color = getColor(lightness, chroma, hue);
        const contrast = getColor(
          lightness - 0.6 >= 0 ? lightness - 0.6 : 1 - lightness,
          chroma,
          hue
        );
        return (
          <div className={styles.wrapper} key={hue}>
            <ScaleItem background={color.hex} text={contrast.hex}>
              {Math.round(lightness * 100)}
            </ScaleItem>
          </div>
        );
      })}
    </div>
  );
};

type ScaleItemProps = {
  background: string;
  text: string;
  children: React.ReactNode;
};
const ScaleItem: React.FC<ScaleItemProps> = ({
  background,
  text,
  children,
}) => (
  <div
    style={{ backgroundColor: background, color: text }}
    className={styles.scaleItem}
  >
    {children}
  </div>
);

const getColor = (lightness: number, chroma: number, hue: number) =>
  better.from(`oklch(${lightness} ${chroma} ${hue})`);

export const LightnessScale = () => {
  return (
    <div className={styles.wrapper}>
      {lightnesses.map((lightness) => (
        <Scale lightness={lightness} chroma={0.5} key={lightness} />
      ))}
    </div>
  );
};

export const ChromaScale = () => {
  return (
    <div className={styles.wrapper}>
      {chromas.map((chroma) => (
        <Scale lightness={0.5} chroma={chroma} key={chroma} />
      ))}
    </div>
  );
};

export const HueScale = () => {
  const getHue = (hue: number) => {
    return better.from(`oklch(0.5 0.5 ${hue})`);
  };

  return (
    <div className={styles.wrapper}>
      {hues.map((hue) => {
        const color = getHue(hue);
        return (
          <div
            className={styles.scaleItem}
            key={hue}
            style={{ backgroundColor: color.hex }}
          >
            {hue}
          </div>
        );
      })}
    </div>
  );
};
