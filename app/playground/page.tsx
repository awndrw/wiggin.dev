import fs from "fs/promises";
import path from "path";
import { PlaygroundItem } from "./PlaygroundItem";
import styles from "./page.module.scss";
import type { Playground } from "./utils";

const getPlaygroundItemFromDirname = async (
  dirname: string
): Promise<Playground> => {
  const pageModule = await import(`./${dirname}/page.tsx`);
  if (!pageModule.playgroundItemData) throw new Error("no metadata found");
  return {
    slug: dirname,
    ...pageModule.playgroundItemData,
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
