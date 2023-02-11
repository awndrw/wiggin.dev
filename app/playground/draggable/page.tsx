import React from "react";
import { Paragraph } from "./Paragraph";
import styles from "./page.module.scss";

export const playgroundItemData = {
  name: "Draggable",
  image: "",
  tags: ["accessible", "mobile", "desktop"],
};

export default function Page() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
          gravida ipsum, vel mattis ligula. Phasellus placerat suscipit tempor.
        </Paragraph>
      </section>
    </div>
  );
}
