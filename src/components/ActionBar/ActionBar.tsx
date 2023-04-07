import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { useRouter } from "next/navigation";
import { Link } from "next-intl";
import { usePathname } from "next-intl/client";
import React from "react";
import { ArrowLeft, Home } from "react-feather";

import { Separator } from "client/radix/Separator";
import { Icon } from "components/Icon";
import { HUES } from "theme/constants";
import { usePrevious } from "utils/usePrevious";

import styles from "./ActionBar.module.scss";
import { ActionBarButton } from "./ActionBarButton";
import { CustomHueSelector } from "./CustomHueSelector";
import { DarkModeToggle } from "./DarkModeToggle";
import { HueSelector } from "./HueSelector";

const ActionBarLink = () => {
  const router = useRouter();
  const pathname = usePathname();
  const previousPathname = usePrevious(pathname) ?? null;

  if (pathname === "/") {
    return null;
  }

  // pathname !== "/" is repeated to prevent a flash of the back button
  const showBackButton = previousPathname !== null && pathname !== "/";

  return (
    <>
      <ActionBarButton>
        {showBackButton ? (
          <button onClick={router.back} className={styles.navButton}>
            <AccessibleIcon label="Back">
              <Icon icon={ArrowLeft} />
            </AccessibleIcon>
          </button>
        ) : (
          // @ts-expect-error: typed routes don't work yet
          <Link href="/" className={styles.navButton}>
            <AccessibleIcon label="Home">
              <Icon icon={Home} />
            </AccessibleIcon>
          </Link>
        )}
      </ActionBarButton>
      <Separator
        orientation="vertical"
        decorative
        className={styles.separator}
      />
    </>
  );
};

export function ActionBar() {
  return (
    <section className={styles.container} aria-label="Action Bar">
      <ActionBarLink />
      <div aria-label="Theme selector" style={{ display: "contents" }}>
        {HUES.map((hue) => (
          <HueSelector hue={hue} key={hue} />
        ))}
        <CustomHueSelector />
        <DarkModeToggle />
      </div>
    </section>
  );
}
