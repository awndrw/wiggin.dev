"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import c from "classnames";
import { Icon } from "components/Icon";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ActionBar.module.scss";

export default function NavButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isBackButton = searchParams.get("ref") === "internal";

  return (
    <button
      className={c(styles.button, styles.backButton)}
      style={{
        borderRadius: isBackButton ? undefined : 0,
      }}
      onClick={isBackButton ? router.back : () => router.push("/")}
      role="link"
    >
      <AccessibleIcon label={isBackButton ? "Back" : "Home"}>
        <Icon iconName={isBackButton ? "arrow-left" : "home"} />
      </AccessibleIcon>
    </button>
  );
}
