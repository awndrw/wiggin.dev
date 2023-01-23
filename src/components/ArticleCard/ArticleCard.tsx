import { Themed } from "client/Themed";
import React from "react";
import styles from "./ArticleCard.module.scss";

interface ArticleCardProps {
  title: string;
  slug: string;
  date: string;
  description: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  slug,
  date,
  description,
}) => (
  <div className={styles.card} key={slug}>
    <Themed>
      <div className={styles.cardBox}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.date}>{date}</h4>
      </div>
    </Themed>
    <p className={styles.description}>{description}</p>
  </div>
);
