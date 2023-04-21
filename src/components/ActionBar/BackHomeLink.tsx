"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Home } from "react-feather";

import { ActionBarButton } from "components/ActionBar/ActionBarButton";
import { Icon } from "components/Icon";
import { usePrevious } from "utils/usePrevious";

export function BackHomeLink({ children }: { children: React.ReactNode }) {
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
          <button onClick={router.back}>
            <AccessibleIcon label="Back">
              <Icon icon={ArrowLeft} />
            </AccessibleIcon>
          </button>
        ) : (
          <Link href="/">
            <AccessibleIcon label="Home">
              <Icon icon={Home} />
            </AccessibleIcon>
          </Link>
        )}
      </ActionBarButton>
      {children}
    </>
  );
}
