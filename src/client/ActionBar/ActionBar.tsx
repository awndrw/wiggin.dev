"use client";

import { Themed } from "client/Themed";
import { usePathname } from "next/navigation";
import React from "react";
import NavButton from "./NavButton";
import styles from "./ActionBar.module.scss";
import ColorSelector from "./ColorSelector";

export function ActionBar() {
  const pathname = usePathname();
  const shouldShowNavButton = pathname !== "/";

  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsRendered(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Themed>
      <div className={styles.container}>
        <div
          role="region"
          aria-label="Action Bar"
          className={styles.actionbar}
          style={{
            transform: isRendered ? "translateY(0)" : "translateY(300%)",
          }}
        >
          {shouldShowNavButton && <NavButton />}
          <div
            role="radiogroup"
            aria-label="Theme selector"
            style={{ display: "contents" }}
          >
            <ColorSelector color="neutral" />
            <ColorSelector color="red" />
            <ColorSelector color="green" />
            <ColorSelector color="blue" />
          </div>
        </div>
      </div>
    </Themed>
  );
}
