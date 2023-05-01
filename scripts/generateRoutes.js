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

/**
 * @param {string} filePath
 * @returns {string}
 */
function getLocalRoute(filePath) {
  return filePath.match(/^app\/\[hue](.+?)\/page\.tsx$/)?.[1] ?? "/";
}

/**
 * @param {string} name
 * @param {object} obj
 * @returns {string}
 */
function createObject(name, obj) {
  const entries = Object.entries(obj)
    .map(([key, value]) => createEntry(key, value))
    .join("\n");
  return `export const ${name} = {
${entries}
} as const;
export const ${name}Schema = z.nativeEnum(${name});
export type ${name} = z.infer<typeof ${name}Schema>;`;
}

/**
 * @param {string} key
 * @param {string} value
 * @returns {string}
 */
function createEntry(key, value) {
  return `  ${key}: "${value}",`;
}

async function getRoutesFile() {
  const globby = await import("globby").then((m) => m.globby);
  const filePaths = await globby(["app/**/page.tsx"]);
  const localRoutes = filePaths.map(getLocalRoute);

  /** @param {string} route */
  const createKey = (route) =>
    route.slice(1).replace(/\//g, "_").replace(/-/g, "").toUpperCase() ||
    "HOME";

  const routeObj = localRoutes.reduce((obj, route) => {
    obj[createKey(route)] = createKey(route);
    return obj;
  }, {});

  const routePathObj = localRoutes.reduce((obj, route) => {
    obj[createKey(route)] = route;
    return obj;
  }, {});

  const routeLastModifiedObj = filePaths.reduce((obj, path) => {
    obj[createKey(getLocalRoute(path))] = getLastModifiedDate(path);
    return obj;
  }, {});

  return `import { z } from "zod";

import { Hue } from "theme/constants";

${createObject("Route", routeObj)}

${createObject("RoutePath", routePathObj)}

${createObject("RouteLastModified", routeLastModifiedObj)}

export type FullRoute = \`/\${Hue}\${RoutePath}\`;
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
