import React from "react";
import c from "classnames";
import styles from "./Icon.module.scss";

type IconName = "arrow-up-right" | "arrow-right" | "smile";

type AvailableSvgProps = Omit<
  React.SVGAttributes<SVGSVGElement>,
  "viewBox" | "xmlns" | "strokeWidth"
>;

export interface IconProps extends AvailableSvgProps {
  iconName: IconName;
}

export function Icon({ iconName, className, ...svgProps }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      className={c(styles.icon, className)}
      {...svgProps}
    >
      {getIconPath(iconName)}
    </svg>
  );
}

const getIconPath = (name: IconName) => {
  switch (name) {
    case "arrow-up-right":
      return (
        <>
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </>
      );
    case "arrow-right":
      return (
        <>
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </>
      );
    case "smile":
      return (
        <>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </>
      );
  }
};
