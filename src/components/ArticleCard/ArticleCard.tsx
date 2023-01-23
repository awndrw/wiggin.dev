import { Themed } from "client/Themed";
import { AllPostsQuery } from "cms/generated";
import { InternalLink } from "components/InternalLink";
import React from "react";
import Balancer from "react-wrap-balancer";
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
      <InternalLink href={`/posts/${slug}`} className={styles.card}>
        <div className={styles.cardBox}>
          <h3 className={styles.title}>{title}</h3>
          {formattedDate && (
            <span className={styles.date}>{formattedDate}</span>
          )}
        </div>
        {description && (
          <p data-color="neutral" className={styles.description}>
            {description}
          </p>
        )}
      </InternalLink>
    </Themed>
  );
};
