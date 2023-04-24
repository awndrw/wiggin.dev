import { globby } from "globby";
import { type MetadataRoute } from "next";

import { url } from "constants/url";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const filePaths = await globby(["app/**/page.tsx"]);
  return filePaths.map((filePath) => {
    const path = filePath.match(/^app\/\[hue]\/(.+?)\/page\.tsx$/)?.[1] ?? "";
    return { url: new URL(path, url).href };
  });
}
