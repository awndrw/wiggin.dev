const env = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV;

export function log(...args: any[]) {
  if (env === "development" || env === "preview") {
    console.log(
      `%c[wiggin.dev]%c ${args[0]}`,
      "color: rgb(120, 120, 120)",
      "color: inherit",
      ...args.slice(1)
    );
  }
}
