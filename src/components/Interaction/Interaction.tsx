import c from "classnames";
import React from "react";
import type { Icon as FeatherIcon } from "react-feather";

import { Icon } from "components/Icon";

import styles from "./Interaction.module.scss";

type InteractionComponent = React.ElementType;

export type InteractionComponentProps<C extends InteractionComponent> =
  React.ComponentPropsWithRef<C>;

export type InteractionProps<C extends InteractionComponent> =
  InteractionComponentProps<C> & {
    component: C;
    icon: FeatherIcon;
  };

export const Interaction = React.forwardRef(InteractionImpl);
function InteractionImpl<C extends InteractionComponent>(
  {
    component: Component,
    icon,
    children,
    className,
    ...props
  }: InteractionProps<C>,
  ref: React.ForwardedRef<React.ComponentRef<C>>
) {
  return (
    <Component
      ref={ref}
      className={c(styles.interaction, className)}
      {...props}
    >
      {children}
      <Icon icon={icon} className={styles.icon} aria-hidden focusable={false} />
    </Component>
  );
}
