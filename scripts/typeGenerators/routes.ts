import child_process from "child_process";

import dependencyTree from "dependency-tree";
import fg from "fast-glob";
import { z } from "zod";

function getLastModifiedDate(pagePath: string) {
  const deps: string[] = dependencyTree.toList({
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

function getLocalRoute(filePath: string) {
  return filePath.match(/^app\/\[hue](.+?)\/page\.tsx$/)?.[1] ?? "/";
}

function createObject(name: string, obj: object) {
  const entries = Object.entries(obj)
    .map(([key, value]) => createEntry(key, value))
    .join("\n");
  return `export const ${name} = {
${entries}
} as const;
export const ${name}Schema = z.nativeEnum(${name});
export type ${name} = z.infer<typeof ${name}Schema>;`;
}

function createEntry(key: string, value: string) {
  return `  ${key}: "${value}",`;
}

export default async function generateRoutesTypes() {
  const filePaths = await fg(["app/**/page.tsx"]);
  const localRoutes = filePaths.map(getLocalRoute);

  const createKey = (route: string) =>
    route.slice(1).replace(/\//g, "_").replace(/-/g, "").toUpperCase() ||
    "HOME";

  const routeObj = localRoutes.reduce(
    (obj, route) => {
      obj[createKey(route)] = createKey(route);
      return obj;
    },
    {} as Record<string, string>,
  );

  const routePathObj = localRoutes.reduce(
    (obj, route) => {
      obj[createKey(route)] = route;
      return obj;
    },
    {} as Record<string, string>,
  );

  const routeLastModifiedObj = filePaths.reduce(
    (obj, path) => {
      obj[createKey(getLocalRoute(path))] =
        getLastModifiedDate(path).toString();
      return obj;
    },
    {} as Record<string, string>,
  );

  return `import { z } from "zod";

import { Hue } from "theme/constants";

${createObject("Route", routeObj)}

${createObject("RoutePath", routePathObj)}

${createObject("RouteLastModified", routeLastModifiedObj)}

export type FullRoute = \`/\${Hue}\${RoutePath}\`;
`;
}
