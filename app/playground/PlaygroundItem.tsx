import { Icon, IconName } from "components/Icon";
import { InternalLink } from "components/InternalLink";
import Image from "next/image";
import styles from "./PlaygroundItem.module.scss";
import type { Playground, PlaygroundTagName } from "./utils";

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
          {tags.map((tag) => {
            if (typeof tag === "string") {
              return (
                <Icon iconName={playgroundItemTagIconMap[tag]} key={tag} />
              );
            } else {
              return (
                <Icon
                  iconName={playgroundItemTagIconMap[tag.name]}
                  key={tag.name}
                />
              );
            }
          })}
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
