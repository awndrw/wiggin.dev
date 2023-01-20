"use client";

import { usePathname, useRouter } from "next/navigation";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Icon } from "components/Icon";
import c from "classnames";
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
