const child_process = require("child_process");
const fs = require("fs");
const path = require("path");

const { z } = require("zod");

const ROUTES_PATH = "src/.types/routes.ts";

function getLastModifiedTimestamp(filePath) {
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

function getLastModifiedDate(pagePath) {
  const pageDirectory = path.dirname(pagePath);
  const relatedFiles = [];
  // push all files in the directory
  fs.readdirSync(pageDirectory).forEach((file) =>
    relatedFiles.push(path.join(pageDirectory, file))
  );
  // push all parent layouts
  let currentDir = pageDirectory;
  while (currentDir !== "app") {
    const parentLayout = path.join(currentDir, "layout.tsx");
    if (fs.existsSync(parentLayout)) {
      relatedFiles.push(parentLayout);
    }
    currentDir = path.dirname(currentDir);
  }
  // get the latest modified date of all related files
  const lastModifiedTimestamps = relatedFiles.map(getLastModifiedTimestamp);
  return Math.max(...lastModifiedTimestamps);
}

function getLocalRoute(filePath) {
  return filePath.match(/^app\/\[hue](.+?)\/page\.tsx$/)?.[1] ?? "/";
}

async function getRoutesFile() {
  const globby = await import("globby").then((m) => m.globby);
  const filePaths = await globby(["app/**/page.tsx"]);
  const localRoutes = filePaths.map(getLocalRoute);

  /** @param {string} route */
  const createKey = (route) =>
    route.slice(1).replace(/\//g, "_").replace(/-/g, "").toUpperCase() ||
    "HOME";
  /**
   * @param {string} route
   * @param {string} value
   */
  const createEntry = (route, value) => `  ${createKey(route)}: "${value}",`;

  const routeNameEntries = localRoutes
    .map((route) => createEntry(route, createKey(route)))
    .join("\n");
  const routeEntries = localRoutes
    .map((route) => createEntry(route, route))
    .join("\n");
  const routeLastModifiedEntries = filePaths
    .map((route) =>
      createEntry(getLocalRoute(route), getLastModifiedDate(route).toString())
    )
    .join("\n");

  return `import { z } from "zod";

import { Hue } from "theme/constants";

export const RouteName = {
${routeNameEntries}
} as const;
export const RouteNameSchema = z.nativeEnum(RouteName);
export type RouteName = z.infer<typeof RouteNameSchema>;

export const Route = {
${routeEntries}
} as const;
export const RouteSchema = z.nativeEnum(Route);
export type Route = z.infer<typeof RouteSchema>;

export const RouteLastModified = {
${routeLastModifiedEntries}
} as const;

export type FullRoute = \`/\${Hue}\${Route}\`;
`;
}

(async () => {
  const routesFileContent = await getRoutesFile();
  fs.mkdir(path.dirname(ROUTES_PATH), { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(ROUTES_PATH, routesFileContent, (err) => {
      if (err) throw err;
    });
  });
})();
