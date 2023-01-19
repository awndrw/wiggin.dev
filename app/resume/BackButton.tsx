"use client";

import { Icon } from "components/Icon";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.scss";

export default function BackButton() {
  const router = useRouter();

  return (
    <button className={styles.button} onClick={router.back}>
      <Icon iconName="arrow-left" />
    </button>
  );
}
