import child_process from "child_process";
import { globby } from "globby";
import { type MetadataRoute } from "next";
import { z } from "zod";

import { url } from "constants/url";

function getLastModifiedDate(filePath: string) {
  const spawn = child_process.spawnSync("git", [
    "log",
    "-1",
    "--pretty=format:%at",
    "--follow",
    "--",
    filePath,
  ]);
  const parsedLastModified = z.coerce
    .number()
    .safeParse(spawn.stdout.toString());
  return parsedLastModified.success
    ? new Date(parsedLastModified.data * 1000)
    : new Date();
}

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const filePaths = await globby(["app/**/page.tsx"]);
  return filePaths.map((filePath) => {
    const path =
      filePath.match(/^app\/(\[hue]\/)?(.+?)\/page\.tsx$/)?.[2] ?? "";
    return {
      url: new URL(path, url).href,
      lastModified: getLastModifiedDate(filePath),
    };
  });
}
