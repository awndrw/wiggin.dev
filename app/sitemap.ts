import child_process from "child_process";
import fs from "fs";
import path from "path";

import { globby } from "globby";
import { type MetadataRoute } from "next";
import { z } from "zod";

import { url } from "constants/url";

function getLastModifiedTimestamp(filePath: string) {
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
    ? parsedLastModified.data * 1000
    : Date.now();
}

function getLastModifiedDate(filePath: string) {
  const directoryPath = path.dirname(filePath);
  const relatedFiles: string[] = [];
  // push all files in the directory
  fs.readdirSync(directoryPath).forEach((file) =>
    relatedFiles.push(path.join(directoryPath, file))
  );
  // push all parent layouts
  let currentDir = directoryPath;
  while (currentDir !== "app") {
    const parentLayout = path.join(currentDir, "layout.tsx");
    if (fs.existsSync(parentLayout)) {
      relatedFiles.push(parentLayout);
    }
    currentDir = path.dirname(currentDir);
  }
  // get the latest modified date of all related files
  const lastModifiedTimestamps = relatedFiles.map(getLastModifiedTimestamp);
  const lastModifiedTimestamp = Math.max(...lastModifiedTimestamps);
  return new Date(lastModifiedTimestamp);
}

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log("..", await globby(["."]));
  const filePaths = await globby(["app/**/page.tsx"]);
  console.log("filePaths", filePaths);
  return filePaths.map((filePath) => {
    const path = filePath.match(/^app\/\[hue](.+?)\/page\.tsx$/)?.[1] ?? "";
    console.log("path", path);
    return {
      url: new URL(path, url).href,
      lastModified: getLastModifiedDate(filePath),
    };
  });
}
