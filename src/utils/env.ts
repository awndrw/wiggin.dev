import { z } from "zod";

const EnvSchema = z.enum(["development", "preview", "production"]);
type Env = z.infer<typeof EnvSchema>;

const currentEnv = EnvSchema.parse(
  process.env.VERCEL_ENV ??
    process.env.NEXT_PUBLIC_VERCEL_ENV ??
    process.env.NODE_ENV
);

function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

const envComparators = EnvSchema.options.reduce((acc, cur) => {
  const key = `is${capitalize(cur)}` as const;
  acc[key] = currentEnv === cur;
  return acc;
}, {} as Record<`is${Capitalize<Env>}`, boolean>);

export const env = {
  ...envComparators,
  value: currentEnv,
};
