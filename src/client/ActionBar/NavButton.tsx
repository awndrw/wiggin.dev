"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Separator } from "client/Separator";
import { ActionBarButton } from "client/ActionBar/ActionBarButton";
import { Icon } from "components/Icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./NavButton.module.scss";

export default function NavButton() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const shouldShowButton = pathname !== "/";
  if (!shouldShowButton) return null;

  const isBackButton = searchParams.get("ref") === "internal";

  return (
    <>
      <ActionBarButton
        focusArrowColor="initial"
        focusArrowClassName={styles.focusArrow}
      >
        <button
          className={styles.navButton}
          style={{
            borderRadius: isBackButton ? undefined : 0,
          }}
          onClick={() => router.push("/")}
          onMouseOver={() => router.prefetch("/")}
          role="link"
        >
          <AccessibleIcon label={isBackButton ? "Back" : "Home"}>
            <Icon iconName={isBackButton ? "arrow-left" : "home"} />
          </AccessibleIcon>
        </button>
      </ActionBarButton>
      <Separator
        orientation="vertical"
        decorative
        className={styles.separator}
        style={{ marginRight: isBackButton ? 4 : 2 }}
      />
    </>
  );
}
