import c from "classnames";
import React from "react";
import type { Icon as FeatherIcon } from "react-feather";

import { Icon } from "components/Icon";
import { NoWrap } from "components/NoWrap";

import styles from "./Interaction.module.scss";
import { Suffixed } from "./Suffixed";

type InteractionComponent = React.ElementType;

export type InteractionComponentProps<C extends InteractionComponent> =
  React.ComponentPropsWithRef<C> & {
    suffix?: string;
    children: string;
  };

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
    suffix,
    className,
    ...props
  }: InteractionProps<C>,
  ref: React.ForwardedRef<React.ComponentRef<C>>
) {
  const words = children.split(" ");

  const content = (
    <>
      {words.length > 1 && (
        <span style={{ whiteSpace: "pre" }}>
          {words.slice(0, -1).join(" ")}{" "}
        </span>
      )}
      <NoWrap>
        {words.slice(-1)}
        <Icon
          icon={icon}
          className={styles.icon}
          aria-hidden
          focusable={false}
        />
      </NoWrap>
    </>
  );

  const res = (
    <Component
      ref={ref}
      className={c(styles.interaction, className)}
      {...props}
    >
      {content}
    </Component>
  );

  if (suffix) {
    return <Suffixed suffix={suffix}>{res}</Suffixed>;
  }

  return res;
}
