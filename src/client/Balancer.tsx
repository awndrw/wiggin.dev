"use client";

import React from "react";

import WrapBalancer from "react-wrap-balancer";

const RATIO_MOBILE = 0.25;
const RATIO_DESKTOP = 0.6;

export type BalancerProps = Omit<
  React.ComponentProps<typeof WrapBalancer>,
  "as" | "ratio"
>;

export const Balancer: React.FC<BalancerProps> = ({ children, ...props }) => {
  const [ratio, setRatio] = React.useState(RATIO_DESKTOP);

  React.useEffect(() => {
    const onResize = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      setRatio(isMobile ? RATIO_MOBILE : RATIO_DESKTOP);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <WrapBalancer as="p" ratio={ratio} {...props}>
      {children}
    </WrapBalancer>
  );
};
