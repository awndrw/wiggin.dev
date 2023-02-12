import * as Tooltip from "client/radix/Tooltip";
import { Icon, IconName } from "components/Icon";
import { InternalLink } from "components/InternalLink";
import Image from "next/image";
import styles from "./PlaygroundItem.module.scss";
import type { Playground, PlaygroundTag, PlaygroundTagName } from "./utils";

export const PlaygroundItem = ({ name, slug, image, tags }: Playground) => {
  return (
    <InternalLink className={styles.container} href={`/playground/${slug}`}>
      <Image
        src={image}
        alt=""
        className={styles.image}
        width={430}
        height={280}
      />
      <div className={styles.footer}>
        <h2 className={styles.link}>{name}</h2>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={typeof tag === "string" ? tag : tag.name} tag={tag} />
          ))}
        </div>
      </div>
    </InternalLink>
  );
};

const playgroundItemTagIconMap: Record<PlaygroundTagName, IconName> = {
  accessible: "smile",
  mobile: "smartphone",
  desktop: "monitor",
};

const playgroundItemTagTooltipMap: Record<PlaygroundTagName, string> = {
  accessible: "Accessible",
  mobile: "Responsive",
  desktop: "Optimized for desktop",
};

const Tag = ({ tag }: { tag: PlaygroundTag }) => {
  let icon: IconName, tooltip: string;
  if (typeof tag === "string") {
    icon = playgroundItemTagIconMap[tag];
    tooltip = playgroundItemTagTooltipMap[tag];
  } else {
    icon = playgroundItemTagIconMap[tag.name];
    tooltip = tag.tooltip ?? playgroundItemTagTooltipMap[tag.name];
  }
  return (
    <Tooltip.Root>
      <Tooltip.Trigger className={styles.iconButton}>
        <Icon iconName={icon} />
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
