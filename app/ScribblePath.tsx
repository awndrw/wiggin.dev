"use client";

import { animated, config, useSpringValue } from "@react-spring/web";
import React from "react";

const minmax = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// The ratio of the animated path length to the full path
const PATH_SIZE = 2;

export const ScribblePath = () => {
  const pathRef = React.createRef<SVGPathElement>();
  const [pathLength, setPathLength] = React.useState(0);
  const strokeDashoffset = useSpringValue<number>(0, { config: config.stiff });

  React.useEffect(() => {
    if (!pathRef.current) {
      return;
    }
    setPathLength(pathRef.current.getTotalLength());
  }, [pathRef]);

  React.useEffect(() => {
    const about = document.querySelector("section[data-about]");
    if (!about) {
      return;
    }

    const handleScroll = () => {
      const scrollProgress =
        1 - about.getBoundingClientRect().top / window.innerHeight;
      const pathProgress = scrollProgress * pathLength;
      strokeDashoffset.start(-1 * minmax(pathProgress, 0, pathLength));
    };
    // run once on load
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathLength, strokeDashoffset]);

  return (
    <animated.path
      ref={pathRef}
      style={{
        strokeDashoffset,
        opacity: !pathLength ? 0 : 1,
        strokeDasharray: `${pathLength / PATH_SIZE} ${pathLength}`,
      }}
      d="m99.85,165.84c60.38-58.96,123.18-119.5,202.17-149.21,78.99-29.72,179.19-20.35,232.88,44.77,47.42,57.51,46.46,142.68,20.14,212.42-36.01,95.43-115.9,173.27-212.23,206.8-59.08,20.56-144.51,10.74-157.51-50.44-10.33-48.61,36.04-91.59,82.88-108.19,52.93-18.75,113.83-18.1,163.5,8.08,49.67,26.18,85.73,79.49,85.09,135.64-.73,64.15-46.03,119.43-96.66,158.83-50.63,39.4-109.02,69.11-154.43,114.42-45.42,45.31-76.51,113.69-54.06,173.79,30.91,82.76,152.64,100.73,223.5,47.96,43.41-32.33,71.59-93.55,46.83-141.68-20.51-39.87-71-57.07-115.39-50.75-44.39,6.32-83.71,31.46-119.55,58.41C116.99,924.42,7.1,1066.77.78,1229.33c-7.45,191.79,133.72,364.44,304.25,452.53,170.53,88.08,366.76,108.59,557.75,127.6"
    />
  );
};
