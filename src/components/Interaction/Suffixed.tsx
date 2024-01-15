"use client";

import { composeRefs } from "@radix-ui/react-compose-refs";
import { type ReactNode, forwardRef, type ForwardedRef } from "react";

import { sx } from "utils/style";
import { useTextWidth } from "utils/useTextWidth";

import styles from "./Suffixed.module.scss";

export interface SuffixedProps {
  suffix: string;
  children: ReactNode;
}

export const Suffixed = forwardRef(SuffixedImpl);
function SuffixedImpl(
  { suffix, children }: SuffixedProps,
  forwardedRef: ForwardedRef<HTMLSpanElement>,
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
