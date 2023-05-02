import { get } from "@vercel/edge-config";
import { type z } from "zod";

export async function getEdgeConfig<T>(
  key: string,
  Schema: z.ZodSchema<T>
): Promise<T> {
  const value = await get<z.infer<typeof Schema>>(key);
  return Schema.parse(value);
}
