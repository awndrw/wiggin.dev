import React from "react";

import c from "classnames";
import { Icon } from "components/Icon";
import type { Icon as FeatherIcon } from "react-feather";

import styles from "./Interaction.module.scss";

type InteractionComponent = React.ComponentType | React.ElementType;

export type InteractionComponentProps<C extends InteractionComponent> =
  React.ComponentProps<C> & { children: string };

export type InteractionProps<C extends InteractionComponent> =
  InteractionComponentProps<C> & {
    component: C;
    icon: FeatherIcon;
  };

const InteractionImpl = <C extends InteractionComponent>(
  {
    component: Component,
    icon,
    children,
    className,
    ...props
  }: InteractionProps<C>,
  ref: React.ForwardedRef<C>
) => {
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
};

export const Interaction = React.forwardRef(InteractionImpl) as <
  C extends InteractionComponent
>(
  props: InteractionProps<C> & { ref?: React.ForwardedRef<C> }
) => ReturnType<typeof InteractionImpl>;
