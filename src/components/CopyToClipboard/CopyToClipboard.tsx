import * as Tooltip from "@radix-ui/react-tooltip";
import { type ReactNode, type FC, useRef, useState } from "react";

import styles from "./CopyToClipboard.module.scss";

export interface CopyToClipboardProps {
  content: string;
  children: ReactNode;
}

export const CopyToClipboard: FC<CopyToClipboardProps> = ({
  content,
  children,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const message = copied ? "Copied!" : "Click to copy";

  return (
    <Tooltip.Root
      delayDuration={0}
      onOpenChange={(open) => !open && setCopied(false)}
    >
      <Tooltip.Trigger
        asChild
        ref={triggerRef}
        onClick={(event) => {
          event.preventDefault();
          navigator.clipboard.writeText(content).then(() => setCopied(true));
        }}
      >
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          onPointerDownOutside={(event) => {
            if (
              triggerRef.current === event.target ||
              triggerRef.current?.contains(event.target as Node)
            ) {
              event.preventDefault();
            }
          }}
          className={styles.content}
        >
          <pre>{message}</pre>
          <Tooltip.Arrow className={styles.arrow} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};
