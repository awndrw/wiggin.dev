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
        <ScribblePath
          viewBox="0 0 862.83 1809.95"
          animatedSegmentLength={4}
          className={c(styles.scribble, styles.one)}
          d="m99.85,165.84c60.38-58.96,123.18-119.5,202.17-149.21,78.99-29.72,179.19-20.35,232.88,44.77,47.42,57.51,46.46,142.68,20.14,212.42-36.01,95.43-115.9,173.27-212.23,206.8-59.08,20.56-144.51,10.74-157.51-50.44-10.33-48.61,36.04-91.59,82.88-108.19,52.93-18.75,113.83-18.1,163.5,8.08,49.67,26.18,85.73,79.49,85.09,135.64-.73,64.15-46.03,119.43-96.66,158.83-50.63,39.4-109.02,69.11-154.43,114.42-45.42,45.31-76.51,113.69-54.06,173.79,30.91,82.76,152.64,100.73,223.5,47.96,43.41-32.33,71.59-93.55,46.83-141.68-20.51-39.87-71-57.07-115.39-50.75-44.39,6.32-83.71,31.46-119.55,58.41C116.99,924.42,7.1,1066.77.78,1229.33c-7.45,191.79,133.72,364.44,304.25,452.53,170.53,88.08,366.76,108.59,557.75,127.6"
        />
      </section>
      <Separator orientation="horizontal" className={styles.separator} />
      <section data-section="about" className={styles.about}>
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
            These colors were brought to you by{" "}
            <span style={{ display: "inline-block" }}>
              <Link
                href="https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/"
                type="external"
              >
                Display-P3
              </Link>
              .
            </span>
          </span>
        </Balancer>
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
    </div>
  );
}
