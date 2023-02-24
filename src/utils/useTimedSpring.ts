"use client";

import { type SpringConfig, useSpring } from "@react-spring/web";
import React from "react";

export interface TimedSpringProps {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: SpringConfig;
  delay?: number;
}

const DEFAULT_PROPS: TimedSpringProps = {
  x: 0,
  y: 0,
  rotation: 0,
  scale: 1,
  timing: 150,
  springConfig: {
    tension: 300,
    friction: 10,
  },
  delay: 0,
} as const;

export default function useTimedSpring() {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [props, setProps] = React.useState<TimedSpringProps>(DEFAULT_PROPS);

  const style = useSpring({
    transform: isAnimating
      ? `translate(${props.x}px, ${props.y}px)
         rotate(${props.rotation}deg)
         scale(${props.scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    delay: props.delay,
    config: props.springConfig,
  });

  React.useEffect(() => {
    if (!isAnimating) {
      return;
    }
    const timeoutId = window.setTimeout(
      () => setIsAnimating(false),
      props.timing
    );
    return () => window.clearTimeout(timeoutId);
  }, [isAnimating, props.timing]);

  const trigger = React.useCallback((newProps: TimedSpringProps) => {
    setProps({ ...DEFAULT_PROPS, ...newProps });
    setIsAnimating(true);
  }, []);

  return [style, trigger] as const;
}
