import c from "classnames";
import { ExternalLink, InternalLink } from "components/Link";
import { Logo } from "components/Logo";
import { tragedyDisplay } from "fonts/tragedy";
// @ts-expect-error it does exist
import { type Metadata } from "next";
import React from "react";
import { Balancer } from "client/Balancer";
import { Separator } from "client/radix/Separator";
import { HueSelectButton } from "./HueSelectButton";
import { Scribbles } from "./Scribbles";
import styles from "./page.module.scss";

const generateBlurb = (prefix: string) =>
  `${prefix} a brooklyn based design engineer passionate about design systems, motion design and accessibility.`;

export const metadata: Metadata = {
  description: generateBlurb("Andrew Wiggin is"),
};

export default async function Page() {
  return (
    <main className={c(styles.page, tragedyDisplay.className)}>
      <section className={styles.hero}>
        <h1>
          Hi, I&apos;m Andrew
          <Logo className={styles.icon} aria-hidden focusable={false} />
        </h1>
        <Balancer>{generateBlurb("I'm")}</Balancer>
        <Scribbles />
      </section>
      <Separator
        orientation="horizontal"
        decorative
        className={styles.separator}
      />
      <section className={styles.about}>
        <Balancer>
          I spent my childhood playing with JavaScript and love using CSS and
          WebAssembly to create performant animations. Check out my{" "}
          <InternalLink href="/resume">resume</InternalLink> or reach out via{" "}
          <ExternalLink href="mailto:andrew@wiggin.dev">email</ExternalLink>.
          These colors use oklch to create an accessible color palette with{" "}
          <HueSelectButton>any hue</HueSelectButton>.
        </Balancer>
      </section>
    </main>
  );
}
