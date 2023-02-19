import c from "classnames";
import { Link } from "components/Link";
import { tragedyDisplay } from "fonts/tragedy";
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
    <main className={c(styles.page, tragedyDisplay.className)}>
      <section className={styles.hero}>
        <h1>
          Hi, I&apos;m Andrew
          <svg
            className={styles.icon}
            viewBox="0 0 590 588"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            focusable={false}
          >
            <path d="M295 51.7487L337.589 153.382L341.506 162.73L345.255 171.677L353.966 168.11L363.612 164.161L465.326 122.52L423.926 223.643L419.735 233.88L416.411 242L427.02 246.446L434.705 249.666L538.001 292.952L434.726 336.229L427.02 339.458L416.431 343.895L419.735 351.966L423.946 362.252L465.326 463.326L364.252 421.946L353.966 417.735L345.895 414.431L341.458 425.02L338.229 432.726L294.952 536.001L251.666 432.705L248.446 425.02L244 414.411L235.88 417.735L225.643 421.926L124.52 463.326L165.885 362.287L170.11 351.966L173.401 343.929L162.73 339.458L155.106 336.263L51.7487 292.952L155.126 249.632L162.73 246.446L173.421 241.966L170.11 233.88L165.905 223.609L124.52 122.52L226.365 164.215L235.88 168.11L244.722 171.731L248.494 162.73L252.389 153.436L295 51.7487Z" />
          </svg>
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
