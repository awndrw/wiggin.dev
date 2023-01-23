import { Themed } from "client/Themed";
import { AllPostsQuery } from "cms/generated";
import NextLink from "next/link";
import React from "react";
import styles from "./ArticleCard.module.scss";

type ArticleCardProps = AllPostsQuery["allPosts"][number];

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  slug,
  _publishedAt,
  description,
}) => {
  const formattedDate = _publishedAt
    ? new Date(_publishedAt).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Themed>
      <NextLink
        href={{
          pathname: `/posts/${slug}`,
          query: { ref: "internal" },
        }}
        className={styles.card}
      >
        <div className={styles.cardBox}>
          <h3 className={styles.title}>{title}</h3>
          <h4 className={styles.date}>{formattedDate}</h4>
        </div>
        <p data-color="neutral" className={styles.description}>
          {description}
        </p>
      </NextLink>
    </Themed>
  );
};
