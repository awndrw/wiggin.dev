import { z } from "zod";

import { type Hue } from "../theme/constants";

export type Point = { x: number; y: number };

export interface Sticker {
  id: number;
  path: string;
  position: Point;
}

export interface Cursor {
  id: User["id"];
  position: Point;
  hue: Hue;
  stickerId?: Sticker["id"];
}

export interface User {
  id: string;
}

export interface Animal {
  name: string;
}

export const Event = {
  STICKER_CREATED: "sticker-created",
  STICKER_MOVED: "sticker-moved",
  STICKER_DELETED: "sticker-deleted",
  STICKER_GRABBED: "sticker-grabbed",

  CURSOR_MOVED: "client-cursor-moved",
  HUE_CHANGED: "client-hue-changed",
} as const;
export const EventSchema = z.nativeEnum(Event);
export type Event = z.infer<typeof EventSchema>;
