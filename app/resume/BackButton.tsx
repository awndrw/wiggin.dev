"use client";

import { Icon } from "components/Icon";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.scss";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";

export default function BackButton() {
  const router = useRouter();

  return (
    <button className={styles.button} onClick={router.back}>
      <AccessibleIcon label="Back">
        <Icon iconName="arrow-left" aria-hidden focusable={false} />
      </AccessibleIcon>
    </button>
  );
}
