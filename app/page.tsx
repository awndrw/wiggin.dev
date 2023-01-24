import c from "classnames";
import { ArticleCard } from "components/ArticleCard";
import { Icon } from "components/Icon";
import { Link } from "components/Link";
import React from "react";
import Balancer from "react-wrap-balancer";
import { sdk } from "cms";
import { Separator } from "client/Separator";
import dynamic from "next/dynamic";
import styles from "./page.module.scss";

const ScribblePath = dynamic(() =>
  import("./ScribblePath").then((m) => m.ScribblePath)
);

const BALANCER_RATIO = 0.45;

export default async function Page() {
  const showWriting = false;

  const allPosts = await sdk.AllPosts({ first: 6 });

  return (
    <div className={styles.page}>
      <section role="main" className={styles.hero}>
        <h1>
          Hi, I&apos;m Andrew
          <Icon
            iconName="smile"
            className={styles.smile}
            aria-hidden
            focusable={false}
          />
        </h1>
        <Balancer ratio={BALANCER_RATIO} as="p">
          I&apos;m an <abbr title="New York City">nyc</abbr> based design
          engineer excited by design systems, motion design and accessibility.
        </Balancer>
        <svg
          className={styles.scribble}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 347.95 1214.43"
        >
          <ScribblePath />
        </svg>
      </section>
      {showWriting && (
        <>
          <Separator orientation="horizontal" className={styles.separator} />
          <section className={c(styles.neutral, styles.writing)}>
            <h2>Writing</h2>
            <div className={styles.articleList}>
              {allPosts.allPosts.map((post) => (
                <ArticleCard {...post} key={post.slug} />
              ))}
            </div>
          </section>
        </>
      )}
      <Separator orientation="horizontal" className={styles.separator} />
      <section className={styles.about}>
        <Balancer ratio={BALANCER_RATIO} as="p">
          I&apos;ve been working on{" "}
          <Link href="https://familycenter.meta.com" type="external">
            parental supervision
          </Link>{" "}
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
    </div>
  );
}
