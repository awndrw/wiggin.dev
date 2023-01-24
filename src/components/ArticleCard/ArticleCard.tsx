import { AllPostsQuery } from "cms/generated";
import { InternalLink } from "components/InternalLink";
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
        year: "numeric",
      })
    : null;

  return (
    <article className={styles.card}>
      <InternalLink href={`/posts/${slug}`} className={styles.cardBox}>
        <h3 className={styles.title}>{title}</h3>
        {formattedDate && <span className={styles.date}>{formattedDate}</span>}
      </InternalLink>
      {description && <p className={styles.description}>{description}</p>}
    </article>
  );
};
