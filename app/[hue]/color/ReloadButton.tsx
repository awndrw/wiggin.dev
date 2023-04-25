"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "components/Button";

export const ReloadButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  return <Button onClick={router.refresh}>{children}</Button>;
};
