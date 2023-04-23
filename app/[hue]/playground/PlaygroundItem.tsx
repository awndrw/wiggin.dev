import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Heart,
  Monitor,
  Smartphone,
  type Icon as FeatherIcon,
} from "react-feather";

import { Icon } from "components/Icon";
import * as Dialog from "components/external/radix/Dialog";
import * as Tooltip from "components/external/radix/Tooltip";

import styles from "./PlaygroundItem.module.scss";
import { WarningDialog } from "./WarningDialog";
import type { Playground, PlaygroundTag, PlaygroundTagName } from "./utils";

export const PlaygroundItem = ({
  name,
  slug,
  preview,
  tags,
  warning,
}: Playground) => {
  const href = `/playground/${slug}`;

  return (
    <article className={styles.article}>
      <Dialog.Root>
        <Image
          src={preview}
          alt=""
          className={styles.image}
          width={430}
          height={280}
        />
        <div className={styles.footer}>
          {warning ? (
            <Dialog.Trigger role="link" className={styles.trigger}>
              <h2 className={styles.link}>{name}</h2>
            </Dialog.Trigger>
          ) : (
            // @ts-expect-error: href isn't typed
            <Link href={href} className={styles.trigger}>
              <h2 className={styles.link}>{name}</h2>
            </Link>
          )}
          <ul role="list" aria-label="Tags" className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={typeof tag === "string" ? tag : tag.name} tag={tag} />
            ))}
          </ul>
        </div>
        {/* @ts-expect-error: href isn't typed */}
        {warning && <WarningDialog warning={warning} continueHref={href} />}
      </Dialog.Root>
    </article>
  );
};

const playgroundItemTagIconMap: Record<PlaygroundTagName, FeatherIcon> = {
  accessible: Heart,
  mobile: Smartphone,
  desktop: Monitor,
};

const playgroundItemTagTooltipMap: Record<PlaygroundTagName, string> = {
  accessible: "Accessible",
  mobile: "Responsive",
  desktop: "Optimized for desktop",
};

const Tag = ({ tag }: { tag: PlaygroundTag }) => {
  let icon: FeatherIcon, tooltip: string;
  if (typeof tag === "string") {
    icon = playgroundItemTagIconMap[tag];
    tooltip = playgroundItemTagTooltipMap[tag];
  } else {
    icon = playgroundItemTagIconMap[tag.name];
    tooltip = tag.tooltip ?? playgroundItemTagTooltipMap[tag.name];
  }
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        role="listitem"
        aria-label={tooltip}
        className={styles.iconButton}
      >
        <Icon icon={icon} aria-hidden />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className={styles.iconTooltip}>
          {tooltip}
          <Tooltip.Arrow className={styles.iconTooltipArrow} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};
