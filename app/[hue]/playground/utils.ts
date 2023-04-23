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

export const PlaygroundConfigSchema = z.object({
  name: z.string(),
  preview: z.string(),
  tags: z.array(PlaygroundTagSchema),
  warning: z.string().optional(),
});
export type PlaygroundConfig = z.infer<typeof PlaygroundConfigSchema>;

export const PlaygroundSchema = PlaygroundConfigSchema.merge(
  z.object({
    slug: z.string(),
  })
);
export type Playground = z.infer<typeof PlaygroundSchema>;
