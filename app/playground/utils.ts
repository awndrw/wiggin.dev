import { z } from "zod";

export const PlaygroundTagNameSchema = z.enum([
  "accessible",
  "mobile",
  "desktop",
]);
export type PlaygroundTagName = z.infer<typeof PlaygroundTagNameSchema>;

export const PlaygroundTagSchema = PlaygroundTagNameSchema.or(
  z.object({
    name: PlaygroundTagNameSchema,
    tooltip: z.string().optional(),
  })
);
export type PlaygroundTag = z.infer<typeof PlaygroundTagSchema>;

export const PlaygroundDataSchema = z.object({
  name: z.string(),
  image: z.string(),
  tags: z.array(PlaygroundTagSchema),
  warning: z.string().optional(),
});
export type PlaygroundData = z.infer<typeof PlaygroundDataSchema>;

export const PlaygroundSchema = PlaygroundDataSchema.merge(
  z.object({
    slug: z.string(),
  })
);
export type Playground = z.infer<typeof PlaygroundSchema>;
