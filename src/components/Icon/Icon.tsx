import c from "classnames";
import React from "react";
import styles from "./Icon.module.scss";

export const IconName = {
  ARROW_UP_RIGHT: "arrow-up-right",
  ARROW_RIGHT: "arrow-right",
  SMILE: "smile",
  ARROW_LEFT: "arrow-left",
  HOME: "home",
  CARET_DOWN: "caret-down",
  MOON: "moon",
  SUN: "sun",
  SMARTPHONE: "smartphone",
  MONITOR: "monitor",
  ALERT_TRIANGLE: "alert-triangle",
} as const;
export type IconName = (typeof IconName)[keyof typeof IconName];

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
    case "arrow-left":
      return (
        <>
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </>
      );
    case "home":
      return (
        <>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </>
      );
    case "caret-down":
      return <polyline points="6 9 12 15 18 9" />;
    case "moon":
      return <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
    case "sun":
      return (
        <>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </>
      );
    case "smartphone":
      return (
        <>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </>
      );
    case "monitor":
      return (
        <>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </>
      );
    case "alert-triangle":
      return (
        <>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </>
      );
  }
};
