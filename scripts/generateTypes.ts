import fs from "fs";
import path from "path";

const TYPES_DIR = "src/.types";

function writeFile(fileName: string, content: string) {
  fs.mkdir(TYPES_DIR, { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(path.join(TYPES_DIR, fileName), content, (err) => {
      if (err) throw err;
    });
  });
}

async function getRoutesFile() {
  const globby = await import("globby").then((m) => m.globby);
  const filePaths = await globby(["app/**/page.tsx"]);
  const localRoutes = filePaths.map((filePath) => {
    return filePath.match(/^app\/\[hue](.+?)\/page\.tsx$/)?.[1] ?? "/";
  });

  const createKey = (route: string) =>
    route.slice(1).replace(/\//g, "_").replace(/-/g, "").toUpperCase() ||
    "HOME";
  const createEntry = (route: string, value: string) =>
    `  ${createKey(route)} = "${value}",`;

  const routeNameEntries = localRoutes
    .map((route) => createEntry(route, createKey(route).toLowerCase()))
    .join("\n");
  const routeEntries = localRoutes
    .map((route) => createEntry(route, route))
    .join("\n");

  return `import {Hue} from "theme/constants";

export enum RouteName {
${routeNameEntries}
}

export enum Route {
${routeEntries}
}

export type FullRoute = \`/\${Hue}\${Route}\`;
`;
}

(async () => {
  const routesFile = await getRoutesFile();
  writeFile("route.ts", routesFile);
})();
