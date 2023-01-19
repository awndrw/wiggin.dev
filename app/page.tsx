import React from "react";
import Balancer from "react-wrap-balancer";
import styles from "./page.module.scss";
import Link from "components/Link";
import Icon from "components/Icon";
import VisuallyHidden from "components/VisuallyHidden";
import { get } from "@vercel/edge-config";

export default async function Page() {
  const showSecondPage = await get("showSecondPage");

  return (
    <>
      <main className={styles.part1}>
        <h1 className={styles.text}>
          Hi, I&apos;m Andrew
          <Icon
            iconName="smile"
            className={styles.smile}
            aria-hidden
            focusable={false}
          />
        </h1>
        <Paragraph>
          I&apos;m an <abbr title="New York City">nyc</abbr> based design
          engineer excited by design systems, motion design and accessibility.
          Check out my{" "}
          <Link href="/resume" type="internal" aria-hidden>
            resume
          </Link>{" "}
          or reach out via{" "}
          <Link href="mailto:andrew@wiggin.dev" type="external" aria-hidden>
            email
          </Link>
          .
        </Paragraph>
        <VisuallyHidden
          asChild
          aria-label="I'm a New York City based design engineer excited by design systems, motion design and accessibility. Check out my resume or reach out via email."
        >
          <p>
            <Link href="/resume.pdf" type="internal" srOnly>
              resume
            </Link>
            <Link href="mailto:andrew@wiggin.dev" type="external" srOnly>
              email
            </Link>
          </p>
        </VisuallyHidden>
      </main>
      {showSecondPage && (
        <section className={styles.part2}>
          <Paragraph>
            I&apos;ve been working on{" "}
            <Link
              href="https://familycenter.meta.com"
              type="external"
              aria-hidden
            >
              parental supervision
            </Link>{" "}
            at Instagram and{" "}
            <Link href="/life" type="internal" aria-hidden>
              living
            </Link>{" "}
            in Brooklyn with my partner and our pets.
          </Paragraph>
        </section>
      )}
    </>
  );
}

function Paragraph({
  children,
  ...props
}: React.ComponentProps<typeof Balancer>) {
  return (
    <Balancer ratio={0.3} as="p" className={styles.text} aria-hidden {...props}>
      {children}
    </Balancer>
  );
}
