"use client";

import { animated, useSpring, config, to } from "@react-spring/web";
import React from "react";

const minmax = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const PATH_SIZE = 1.9;

export const ScribblePath = () => {
  const pathRef = React.createRef<SVGPathElement>();
  const [pathLength, setPathLength] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const pathStyle = useSpring({
    scrollProgress,
    pathLength,
    config: config.stiff,
  });

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
      const aboutTop = about.getBoundingClientRect().top;
      setScrollProgress(1 - aboutTop / window.innerHeight);
    };
    // run once on load
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <animated.path
      ref={pathRef}
      style={{
        opacity: !pathLength ? 0 : 1,
        strokeDashoffset: to(
          [pathStyle.scrollProgress, pathStyle.pathLength],
          (scrollProgress, pathLength) => {
            const progress = -1 * scrollProgress * pathLength;
            return minmax(progress, -1 * pathLength, 0);
          }
        ),
        strokeDasharray: to(
          pathStyle.pathLength,
          (pathLength) => `${pathLength / PATH_SIZE} ${pathLength}`
        ),
      }}
      d="m14.92,132.02C68.47,70.61,136.07,8.75,221.33,4.23c33.3-2.34,59.21,12.73,55.08,48.92-8.28,45.83-63.52,113.72-95.39,148.68-26.5,28.98-57.29,57.48-95.88,64.79-7.98,2-10.94-3.58-9.04-11.07,3.7-14.07,15.75-24.19,27.64-32.56,41.1-28.95,88.53-48.87,137.98-57.94,12.35-2.27,26.05-3.62,36.6,3.19,17.59,11.34,16.12,37.38,10.47,57.53-16.35,58.3-50.68,111.41-97.13,150.25-9.67,8.09-20.26,15.77-32.58,18.49-10.5,2.33-24.44-1.66-25.85-12.33-.86-6.54,3.48-12.53,7.86-17.46,23.89-26.83,60.69-46.18,95.44-37.03,16.98,4.47,32.63,16.41,38.31,33.03,3.37,9.86,3.11,20.58,1.99,30.94-8.72,77.47-58.6,140.04-103.96,200.15-23.11,30.63-42.97,63.44-65.96,94.05-25.48,33.93-55.32,64.9-75.49,102.55-28.83,53.81-35.32,119.16-17.64,177.59,8.3,27.44,23,54.69,47.89,68.91,37.59,21.48,86.47,7.49,126.73,23.43,10.09,3.99,19.6,9.98,26.3,18.52,21.1,26.89,8.24,68.42,25.22,98.08,9.9,17.29,28.83,27.9,48.27,32.28s39.64,3.3,59.53,2.2"
    />
  );
};
