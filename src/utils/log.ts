import { env } from "utils/env";

export class Logger {
  private static isolated: string;

  constructor(private prefix: string) {}

  log(message: string, ...args: any[]) {
    if (this.enabled()) {
      console.log(
        `%c[${this.prefix}]%c ${message}\n`,
        "color: rgb(120, 120, 120)",
        "color: inherit",
        ...args
      );
    }
  }

  isolate(prefix = this.prefix) {
    Logger.isolated = prefix;
  }

  private enabled() {
    const isDev = env === "development" || env === "preview";
    const isIsolated = Logger.isolated && Logger.isolated !== this.prefix;
    return isDev && !isIsolated;
  }
}
