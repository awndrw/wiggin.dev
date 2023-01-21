"use client";

import { animated, config, useSpring } from "@react-spring/web";
import React from "react";

type AnimateSlideInProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

const AnimateSlideIn = React.forwardRef<HTMLDivElement, AnimateSlideInProps>(
  ({ children, ...props }, ref) => {
    const [style, api] = useSpring(
      () => ({
        transform: "translateY(300%)",
        config: config.molasses,
      }),
      []
    );

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        api.start({ transform: "translateY(0)" });
      }, 1500);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <animated.div style={style} {...props}>
        {children}
      </animated.div>
    );
  }
);
AnimateSlideIn.displayName = "AnimateSlideIn";

export default AnimateSlideIn;
