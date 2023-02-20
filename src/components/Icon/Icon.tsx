import c from "classnames";
import React from "react";
import styles from "./Icon.module.scss";
import type {
  Icon as FeatherIcon,
  IconProps as FeatherIconProps,
} from "react-feather";

export interface IconProps extends FeatherIconProps {
  icon: FeatherIcon;
}

export const Icon: React.FC<IconProps> = ({
  icon: Icon,
  className,
  children,
  ...props
}) => {
  return (
    <Icon className={c(styles.icon, className)} {...props}>
      {children}
    </Icon>
  );
};
