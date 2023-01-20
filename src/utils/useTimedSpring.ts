"use client";

import React from "react";
import { SpringConfig, SpringValue, useSpring } from "@react-spring/web";

export interface TimedSpringStyle {
  transform?: SpringValue<string>;
}

export type TimedSpringTrigger = (props: TimedSpringProps) => void;

export type TimedSpring = [TimedSpringStyle, TimedSpringTrigger];

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
};

export default function useTimedSpring(): TimedSpring {
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

  return [style, trigger];
}
