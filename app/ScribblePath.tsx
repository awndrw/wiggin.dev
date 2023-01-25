"use client";

import { animated } from "@react-spring/web";
import { useAnimatedPath } from "client/useAnimatedPath";
import React from "react";

export const ScribblePath = ({
  d,
  viewBox,
  animatedSegmentLength,
  className,
}: {
  d: string;
  viewBox: string;
  animatedSegmentLength: number;
  className?: string;
}) => {
  const pathRef = React.createRef<SVGPathElement>();

  const { strokeDashoffset, strokeDasharray, mounted } = useAnimatedPath({
    pathRef,
    animatedSegmentLength,
    scrollTargetSelector: "[data-section='about']",
  });

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
    >
      <animated.path
        ref={pathRef}
        style={{
          strokeDashoffset,
          strokeDasharray,
          opacity: mounted ? 1 : 0,
        }}
        d={d}
      />
    </svg>
  );
};
