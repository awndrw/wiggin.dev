"use client";

import { config, useSpringValue } from "@react-spring/web";
import React from "react";

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
      const startingPosition = pathLength + pathLength / animatedSegmentLength;
      const endingPosition =
        pathLength - pathLength / (animatedSegmentLength - 1);
      const travelDistance = startingPosition - endingPosition;
      const pathProgress = scrollProgress * travelDistance;
      strokeDashoffset.start(startingPosition - pathProgress);
    };
    // run once on load
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    animatedSegmentLength,
    pathLength,
    scrollTargetSelector,
    strokeDashoffset,
  ]);

  return {
    strokeDashoffset,
    strokeDasharray: `${pathLength / animatedSegmentLength} ${pathLength}`,
    mounted: !!pathLength,
  };
};
