import {
  a,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  useSpringValue,
} from "@react-spring/web";
import c from "classnames";
import { type SVGProps, type FC, useRef, useState } from "react";

import { useInView } from "utils/useInView";

import styles from "./AnimatedPath.module.scss";

export interface AnimatedPathProps extends SVGProps<SVGSVGElement> {
  d: string;
  /* The ratio of the animated path length to the full path */
  animatedPathRatio: number;
  targetId: string;
  startVisible?: boolean;
}

export const AnimatedPath: FC<AnimatedPathProps> = ({
  d,
  animatedPathRatio,
  targetId,
  startVisible = true,
  className,
  ...props
}) => {
  const pathRef = useRef<SVGPathElement>();
  const [pathLength, setPathLength] = useState(0);
  const strokeDashoffset = useSpringValue<number>(0);
  const reducedMotion = useReducedMotion();
  const targetInView = useInView(`#${targetId}`);

  const segmentLength = pathLength / animatedPathRatio;

  const recalculatePathLength = () => {
    const path = pathRef.current;
    if (!path) return;
    const scale = path.getBoundingClientRect().width / path.getBBox().width;
    setPathLength(path.getTotalLength() * scale);
  };

  useIsomorphicLayoutEffect(() => {
    const recalculateStrokeDashoffset = (immediate: boolean) => {
      const about = document.querySelector(`#${targetId}`);
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

  const opacity = !startVisible && !targetInView ? 0 : !pathLength ? 0 : 1;
  return reducedMotion ? null : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable={false}
      className={c(styles.animatedPath, className)}
      {...props}
    >
      <a.path
        ref={(path) => {
          // @ts-expect-error current is mutable, not readonly
          pathRef.current = path;
          recalculatePathLength();
        }}
        vectorEffect="non-scaling-stroke"
        style={{
          strokeDashoffset,
          opacity,
          strokeDasharray: `${segmentLength} ${pathLength}`,
        }}
        d={d}
      />
    </svg>
  );
};
