"use client";

import {
  animated,
  config,
  useIsomorphicLayoutEffect,
  useSpringValue,
} from "@react-spring/web";
import React from "react";

export interface AnimatedPathProps {
  d: string;
  /* The ratio of the animated path length to the full path */
  animatedPathRatio: number;
}

export const AnimatedPath: React.FC<AnimatedPathProps> = ({
  d,
  animatedPathRatio,
}) => {
  const pathRef = React.useRef<SVGPathElement>();
  const [pathLength, setPathLength] = React.useState(0);
  const strokeDashoffset = useSpringValue<number>(0);

  const recalculatePathLength = () => {
    console.log("in recalculatePathLength");
    const path = pathRef.current;
    if (!path) return;
    const scale = path.getBoundingClientRect().width / path.getBBox().width;
    setPathLength(path.getTotalLength() * scale);
  };

  React.useEffect(() => {
    const recalculateStrokeDashoffset = () => {
      console.log("in recalculateStrokeDashoffset");
      const about = document.querySelector("main > section:nth-of-type(2)");
      if (!about) return;
      const scrollProgress =
        1 - about.getBoundingClientRect().top / window.innerHeight;
      const pathProgress = pathLength * scrollProgress;
      const startingPosition = pathLength + pathLength / animatedPathRatio;
      strokeDashoffset.start(startingPosition - pathProgress, {
        immediate: true,
      });
    };
    recalculateStrokeDashoffset();
    window.addEventListener("scroll", recalculateStrokeDashoffset);
    window.addEventListener("resize", recalculatePathLength);
    return () => {
      window.removeEventListener("scroll", recalculateStrokeDashoffset);
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
        strokeDasharray: `${pathLength / animatedPathRatio} ${pathLength}`,
        willChange: "stroke-dashoffset",
      }}
      d={d}
    />
  );
};
