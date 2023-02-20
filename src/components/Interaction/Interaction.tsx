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

export const Interaction = <C extends InteractionComponent>({
  component: Component,
  icon,
  children,
  className,
  ...props
}: InteractionProps<C>) => {
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
    <Component className={c(styles.interaction, className)} {...props}>
      {content}
    </Component>
  );
};

const Test1 = (
  <Interaction component="a" icon={ArrowRight} href="/test">
    Test 1
  </Interaction>
);
const Test2 = (
  <Interaction component={NextLink} icon={ArrowRight} href="/test">
    Test 2
  </Interaction>
);
