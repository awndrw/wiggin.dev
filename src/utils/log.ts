import { env } from "utils/env";

export function log(...args: any[]) {
  if (env === "development" || env === "preview") {
    console.log(
      `%c[wiggin.dev]%c ${args[0]}\n`,
      "color: rgb(120, 120, 120)",
      "color: inherit",
      ...args.slice(1)
    );
  }
}
