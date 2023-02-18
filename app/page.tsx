import c from "classnames";
import { Icon } from "components/Icon";
import { Link } from "components/Link";
import { tragedy } from "fonts";
import React from "react";
import { Balancer } from "client/Balancer";
import { Separator } from "client/radix/Separator";
import { Scribbles } from "./Scribbles";
import styles from "./page.module.scss";

const generateBlurb = (prefix: string) =>
  `${prefix} a brooklyn based design engineer passionate about design systems, motion design and accessibility.`;

export const metadata = {
  description: generateBlurb("Andrew Wiggin is"),
};

export default async function Page() {
  return (
    <main className={c(styles.page, tragedy.className)}>
      <section className={styles.hero}>
        <h1>
          Hi, I&apos;m Andrew
          <Icon
            iconName="smile"
            className={styles.smile}
            aria-hidden
            focusable={false}
          />
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
          I&apos;ve been working on{" "}
          <Link href="https://familycenter.meta.com" type="external">
            parental supervision
          </Link>{" "}
          at Instagram and playing with CSS and WebAssembly in my free time.
          Check out my{" "}
          <Link href="/resume" type="internal">
            resume
          </Link>{" "}
          or reach out via{" "}
          <span style={{ display: "inline-block" }}>
            <Link href="mailto:andrew@wiggin.dev" type="external">
              email
            </Link>
            .
          </span>{" "}
          These colors were brought to you by{" "}
          <Link
            href="https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/"
            type="external"
          >
            Display P3
          </Link>
          .
        </Balancer>
      </section>
    </main>
  );
}
