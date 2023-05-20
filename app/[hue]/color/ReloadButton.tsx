"use client";

import { useRouter } from "next/navigation";
import { type FC } from "react";

import { Button, type ButtonProps } from "components/Button";

export type ReloadButtonProps = Omit<ButtonProps, "onClick">;

export const ReloadButton: FC<ReloadButtonProps> = ({ children, ...props }) => {
  const router = useRouter();

  return (
    <Button onClick={router.refresh} {...props}>
      {children}
    </Button>
  );
};
