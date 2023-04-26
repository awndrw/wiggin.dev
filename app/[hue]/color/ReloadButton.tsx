"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Button, type ButtonProps } from "components/Button";

export type ReloadButtonProps = Omit<ButtonProps, "onClick">;

export const ReloadButton: React.FC<ReloadButtonProps> = ({
  children,
  ...props
}) => {
  const router = useRouter();

  return (
    <Button onClick={router.refresh} {...props}>
      {children}
    </Button>
  );
};
