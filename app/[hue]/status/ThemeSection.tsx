"use client";

import { useAtomValue } from "jotai";
import React from "react";

import { Section, type SectionProps } from "components/Section";
import { hueAtom, modeAtom } from "store";

import { Item } from "./Item";

export const ThemeSection: React.FC<SectionProps> = (props) => {
  const hue = useAtomValue(hueAtom);
  const mode = useAtomValue(modeAtom);

  return (
    <Section {...props}>
      <Item title="Hue" value={hue} />
      <Item title="Mode" value={mode} />
    </Section>
  );
};
