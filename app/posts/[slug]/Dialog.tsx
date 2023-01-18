"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import styles from "./Dialog.module.scss";

export default function Dialog({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  const router = useRouter();

  return (
    <RadixDialog.Root
      defaultOpen
      onOpenChange={(open) => !open && router.back()}
    >
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content className={styles.dialogContent}>
          <RadixDialog.Title>{title}</RadixDialog.Title>
          <RadixDialog.Description>{date}</RadixDialog.Description>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
