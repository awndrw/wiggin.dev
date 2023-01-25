"use client";

import { config, useSpringValue } from "@react-spring/web";
import React from "react";

const minmax = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export interface AnimatedPathProps {
  pathRef: React.RefObject<SVGPathElement>;
  scrollTargetSelector: string;
  /** The ratio of the animated path length to the full path */
  animatedSegmentLength?: number;
}

export const useAnimatedPath = ({
  pathRef,
  scrollTargetSelector,
  animatedSegmentLength = 2,
}: AnimatedPathProps) => {
  const [pathLength, setPathLength] = React.useState(0);
  const strokeDashoffset = useSpringValue<number>(0, { config: config.stiff });

  React.useEffect(() => {
    if (!pathRef.current) return;
    setPathLength(pathRef.current.getTotalLength());
  }, [pathRef]);

  React.useEffect(() => {
    const scrollTarget = document.querySelector(scrollTargetSelector);
    if (!scrollTarget) return;

    const handleScroll = () => {
      const scrollProgress =
        1 - scrollTarget.getBoundingClientRect().top / window.innerHeight;
      const pathProgress = scrollProgress * pathLength;
      strokeDashoffset.start(-1 * minmax(pathProgress, 0, pathLength));
    };
    // run once on load
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathLength, strokeDashoffset]);

  return {
    strokeDashoffset,
    strokeDasharray: `${pathLength / animatedSegmentLength} ${pathLength}`,
    mounted: !!pathLength,
  };
};
