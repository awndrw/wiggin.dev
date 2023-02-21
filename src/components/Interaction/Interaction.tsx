import c from "classnames";
import { Icon } from "components/Icon";
import NextLink from "next/link";
import React from "react";
import { ArrowRight } from "react-feather";
import styles from "./Interaction.module.scss";
import type { Icon as FeatherIcon } from "react-feather";

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
  const words = children.split(" ");
  const lastWord = words.at(-1);
  const rest = words.slice(0, -1).join(" ");
  const content = (
    <>
      {rest.length ? rest + " " : ""}
      <span style={{ display: "inline-block" }}>
        {lastWord}
        <Icon
          icon={icon}
          className={styles.icon}
          aria-hidden
          focusable={false}
        />
      </span>
    </>
  );

  return (
    <Component
      ref={ref}
      className={c(styles.interaction, className)}
      {...props}
    >
      {content}
    </Component>
  );
};

export const Interaction = React.forwardRef(InteractionImpl) as <
  C extends InteractionComponent
>(
  props: InteractionProps<C> & { ref?: React.ForwardedRef<C> }
) => ReturnType<typeof InteractionImpl>;
