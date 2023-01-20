import { Icon } from "components/Icon";
import { Link } from "components/Link";
import { Themed } from "components/Themed";
import { VisuallyHidden } from "components/VisuallyHidden";
import React from "react";
import Balancer from "react-wrap-balancer";
import { env } from "utils/env";
import styles from "./page.module.scss";

export default async function Page() {
  const showSecondPage = env.VERCEL_ENV !== "production";

  return (
    <>
      <Themed>
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
      </Themed>
      {showSecondPage && (
        <section className={styles.part2}>
          <Paragraph>
            I&apos;ve been working on{" "}
            <Themed>
              <Link
                href="https://familycenter.meta.com"
                type="external"
                aria-hidden
              >
                parental supervision
              </Link>
            </Themed>{" "}
            at Instagram and playing with CSS and WebAssembly in my free time.
          </Paragraph>
          <VisuallyHidden
            asChild
            aria-label="I've been working on parental supervision at Instagram and playing with CSS and WebAssembly in my free time."
          >
            <p>
              <Link href="https://familycenter.meta.com" type="external" srOnly>
                parental supervision at Instagram
              </Link>
            </p>
          </VisuallyHidden>
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
