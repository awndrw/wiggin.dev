import { ArticleCard } from "components/ArticleCard";
import { Icon } from "components/Icon";
import { Link } from "components/Link";
import { Themed } from "client/Themed";
import { VisuallyHidden } from "client/VisuallyHidden";
import React from "react";
import Balancer from "react-wrap-balancer";
import { sdk } from "cms";
import { env } from "utils/env";
import { Separator } from "client/Separator";
import styles from "./page.module.scss";

export default async function Page() {
  const showSecondPage = false;
  const showWriting = env.VERCEL_ENV !== "production";

  const allPosts = await sdk.AllPosts({ first: 6 });

  return (
    <div className={styles.page}>
      <Themed>
        <main className={styles.hero}>
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
              <Link href="/resume/resume.pdf" type="internal" srOnly>
                resume
              </Link>
              <Link href="mailto:andrew@wiggin.dev" type="external" srOnly>
                email
              </Link>
            </p>
          </VisuallyHidden>
        </main>
      </Themed>
      <Themed>
        <Separator orientation="horizontal" className={styles.separator} />
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
      {showWriting && (
        <section>
          <h2 className={styles.text}>Writing</h2>
          <div className={styles.articleList}>
            {allPosts.allPosts.map((post) => (
              <ArticleCard {...post} key={post.slug} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Paragraph({
  children,
  ...props
}: React.ComponentProps<typeof Balancer>) {
  return (
    <Balancer ratio={0.4} as="p" className={styles.text} aria-hidden {...props}>
      {children}
    </Balancer>
  );
}
