"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import c from "classnames";
import { Icon } from "components/Icon";
import { usePathname, useRouter } from "next/navigation";
import styles from "./ActionBar.module.scss";

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  const shouldShowBackButton = pathname !== "/";

  return (
    <button
      className={c(styles.button, styles.backButton)}
      style={{ display: shouldShowBackButton ? undefined : "none" }}
      onClick={router.back}
    >
      <AccessibleIcon label={"Back"}>
        <Icon iconName="arrow-left" />
      </AccessibleIcon>
    </button>
  );
}
