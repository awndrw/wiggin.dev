import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

import styles from "./CopyToClipboard.module.scss";

export interface CopyToClipboardProps {
  content: string;
  children: React.ReactNode;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  content,
  children,
}) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = React.useState(false);

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
