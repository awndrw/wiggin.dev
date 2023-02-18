"use client";

import {
  animated,
  useIsomorphicLayoutEffect,
  useSpringValue,
} from "@react-spring/web";
import React from "react";

export interface AnimatedPathProps {
  d: string;
  /* The ratio of the animated path length to the full path */
  animatedPathRatio: number;
  startVisible?: boolean;
}

export const AnimatedPath: React.FC<AnimatedPathProps> = ({
  d,
  animatedPathRatio,
  startVisible = true,
}) => {
  const pathRef = React.useRef<SVGPathElement>();
  const [pathLength, setPathLength] = React.useState(0);
  const strokeDashoffset = useSpringValue<number>(0);

  const segmentLength = pathLength / animatedPathRatio;

  const recalculatePathLength = () => {
    const path = pathRef.current;
    if (!path) return;
    const scale = path.getBoundingClientRect().width / path.getBBox().width;
    setPathLength(path.getTotalLength() * scale);
  };

  useIsomorphicLayoutEffect(() => {
    const recalculateStrokeDashoffset = (immediate: boolean) => {
      const about = document.querySelector("main > section:nth-of-type(2)");
      if (!about) return;
      const scrollProgress =
        1 - about.getBoundingClientRect().top / window.innerHeight;
      const startingPosition =
        pathLength + (startVisible ? segmentLength : 2 * segmentLength);
      const pathProgress =
        scrollProgress *
        (startVisible ? pathLength : pathLength + segmentLength);
      strokeDashoffset.start(startingPosition - pathProgress, { immediate });
    };
    recalculateStrokeDashoffset(true);
    const handleScroll = () => recalculateStrokeDashoffset(false);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", recalculatePathLength);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", recalculatePathLength);
    };
  }, [animatedPathRatio, pathLength, strokeDashoffset]);

  return (
    <animated.path
      ref={(path) => {
        // @ts-ignore current is mutable, not readonly
        pathRef.current = path;
        recalculatePathLength();
      }}
      vectorEffect="non-scaling-stroke"
      style={{
        strokeDashoffset,
        opacity: !pathLength ? 0 : 1,
        strokeDasharray: `${segmentLength} ${pathLength}`,
      }}
      d={d}
    />
  );
};
