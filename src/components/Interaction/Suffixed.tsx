"use client";

import { composeRefs } from "@radix-ui/react-compose-refs";
import React from "react";

import { sx } from "utils/style";
import { useTextWidth } from "utils/useTextWidth";

import styles from "./Suffixed.module.scss";

export interface SuffixedProps {
  suffix: string;
  children: React.ReactNode;
}

export const Suffixed = React.forwardRef(SuffixedImpl);
function SuffixedImpl(
  { suffix, children }: SuffixedProps,
  forwardedRef: React.ForwardedRef<HTMLSpanElement>
) {
  const [ref, suffixWidth] = useTextWidth(suffix);

  return (
    <span
      style={sx({
        "--suffix": `"${suffix}"`,
        "--suffix-width": `${suffixWidth}px`,
      })}
      ref={composeRefs(ref, forwardedRef)}
      className={styles.suffixed}
    >
      {children}
    </span>
  );
}
