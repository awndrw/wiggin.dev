import fs from "fs/promises";
import path from "path";

import { PlaygroundItem } from "./PlaygroundItem";
import styles from "./page.module.scss";
import { PlaygroundConfigSchema, type Playground } from "./utils";

export const metadata = {
  title: "playground",
};

const getPlaygroundItemFromDirname = async (
  dirname: string
): Promise<Playground> => {
  const pageConfig = await import(`./${dirname}/config.ts`).then(
    (m) => m.default
  );
  const parsedConfig = PlaygroundConfigSchema.safeParse(pageConfig);
  if (!parsedConfig.success) throw new Error("invalid metadata");
  return {
    slug: dirname,
    ...parsedConfig.data,
  };
};

export default async function Page() {
  const playgroundDirs = await fs
    .readdir(path.resolve("./app/playground"), {
      withFileTypes: true,
    })
    .then((directories) =>
      directories.reduce(
        (items, dirent) =>
          dirent.isDirectory() ? items.concat(dirent.name) : items,
        [] as string[]
      )
    );
  const playgroundPages = await Promise.all(
    playgroundDirs.map(getPlaygroundItemFromDirname)
  );

  return (
    <div className={styles.container}>
      {playgroundPages.map((item) => (
        <PlaygroundItem key={item.slug} {...item} />
      ))}
    </div>
  );
}
