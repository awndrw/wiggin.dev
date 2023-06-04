import { z } from "zod";

const NodeEnvSchema = z.enum(["development", "preview", "production"]);
type NodeEnv = z.infer<typeof NodeEnvSchema>;

const currentEnv = NodeEnvSchema.parse(
  process.env.VERCEL_ENV ||
    process.env.NEXT_PUBLIC_VERCEL_ENV ||
    process.env.NODE_ENV
);

function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

const envComparators = NodeEnvSchema.options.reduce((acc, cur) => {
  const key = `is${capitalize(cur)}` as const;
  acc[key] = currentEnv === cur;
  return acc;
}, {} as Record<`is${Capitalize<NodeEnv>}`, boolean>);

export const env = {
  ...envComparators,
  value: currentEnv,
};
