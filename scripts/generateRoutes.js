const child_process = require("child_process");
const fs = require("fs");
const path = require("path");

const dependencyTree = require("dependency-tree");
const { z } = require("zod");

const ROUTES_PATH = "src/.types/routes.ts";

function getLastModifiedDate(pagePath) {
  const deps = dependencyTree.toList({
    filename: pagePath,
    directory: ".",
  });
  const lastModifiedTimestamps = deps.map((dependency) => {
    const spawn = child_process.spawnSync("git", [
      "log",
      "-1",
      "--pretty=format:%at",
      "--follow",
      "--",
      dependency,
    ]);
    const parsedLastModified = z.coerce
      .number()
      .safeParse(spawn.stdout.toString());
    return parsedLastModified.success
      ? parsedLastModified.data * 1000
      : Date.now();
  });
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

  const routeIdsArray = localRoutes
    .map((route) => `"${createKey(route)}"`)
    .join(", ");

  const routeNameEntries = localRoutes
    .map(
      (route) => `  ${createKey(route)} = "${createKey(route).toLowerCase()}",`
    )
    .join("\n");

  const routeEntries = localRoutes
    .map((route) => `  ${createKey(route)}: "${route}",`)
    .join("\n");

  const routeLastModifiedEntries = filePaths
    .map(
      (route) =>
        `  ${createKey(getLocalRoute(route))}: "${getLastModifiedDate(
          route
        ).toString()}",`
    )
    .join("\n");

  return `import { Hue } from "theme/constants";

export const routeIds = [${routeIdsArray}] as const;

export enum RouteName {
${routeNameEntries}
}

export const Route = {
${routeEntries}
} as const;
export type Route = typeof Route[keyof typeof Route];

export const RouteLastModified = {
${routeLastModifiedEntries}
} as const;
export type RouteLastModified = typeof RouteLastModified[keyof typeof RouteLastModified];

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
