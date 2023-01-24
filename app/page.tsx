import c from "classnames";
import { ArticleCard } from "components/ArticleCard";
import { Icon } from "components/Icon";
import { Link } from "components/Link";
import React from "react";
import Balancer from "react-wrap-balancer";
import { sdk } from "cms";
import { Separator } from "client/Separator";
import styles from "./page.module.scss";

const BALANCER_RATIO = 0.4;

export default async function Page() {
  const showWriting = false;

  const allPosts = await sdk.AllPosts({ first: 6 });

  return (
    <>
      <section role="main" className={c(styles.textcolumn, styles.hero)}>
        <h1 className={styles.text}>
          Hi, I&apos;m Andrew
          <Icon
            iconName="smile"
            className={styles.smile}
            aria-hidden
            focusable={false}
          />
        </h1>
        <Balancer ratio={BALANCER_RATIO} as="p" className={styles.text}>
          I&apos;m an <abbr title="New York City">nyc</abbr> based design
          engineer excited by design systems, motion design and accessibility.
        </Balancer>
      </section>
      {showWriting && (
        <>
          <Separator orientation="horizontal" className={styles.separator} />
          <section className={c(styles.neutral, styles.writing)}>
            <h2 className={styles.text}>Writing</h2>
            <div className={styles.articleList}>
              {allPosts.allPosts.map((post) => (
                <ArticleCard {...post} key={post.slug} />
              ))}
            </div>
          </section>
        </>
      )}
      <Separator orientation="horizontal" className={styles.separator} />
      <section className={c(styles.textcolumn, styles.neutral)}>
        <Balancer ratio={BALANCER_RATIO} as="p" className={styles.text}>
          I&apos;ve been working on{" "}
          <Link href="https://familycenter.meta.com" type="external">
            parental supervision
          </Link>
          at Instagram and playing with CSS and WebAssembly in my{" "}
          <Link href="/life" type="internal">
            free time
          </Link>
          . Check out my{" "}
          <Link href="/resume" type="internal">
            resume
          </Link>{" "}
          or reach out via{" "}
          <Link href="mailto:andrew@wiggin.dev" type="external">
            email
          </Link>
          .{" "}
          <span className={styles.displayP3}>
            These vivid colors were brought to you by{" "}
            <Link
              href="https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/"
              type="external"
            >
              Display-P3
            </Link>
            .
          </span>
        </Balancer>
      </section>
    </>
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
