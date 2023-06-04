import { env } from "constants/env";

let warnOnce: (msg: string) => void = () => null;

if (!env.isProduction) {
  const warned = new Set<string>();
  warnOnce = (msg: string) => {
    if (warned.has(msg)) return;
    warned.add(msg);
    console.warn(msg);
  };
}

export { warnOnce };
