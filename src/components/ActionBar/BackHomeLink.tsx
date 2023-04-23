"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import Link from "next/link";
import React from "react";
import { Home } from "react-feather";

import { ActionBarButton } from "components/ActionBar/ActionBarButton";
import { Icon } from "components/Icon";
import { usePathname, useInternalLinkProps } from "components/Link";

export function BackHomeLink({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const homeLinkProps = useInternalLinkProps("/");

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <ActionBarButton>
        <Link {...homeLinkProps}>
          <AccessibleIcon label="Home">
            <Icon icon={Home} />
          </AccessibleIcon>
        </Link>
      </ActionBarButton>
      {children}
    </>
  );
}
