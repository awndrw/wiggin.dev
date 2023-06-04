"use server";

import { sql } from "@vercel/postgres";

import { createClient } from "stickerboard/server";
import { type Select } from "utils/select";

/* Data received from postgres has this shape */
export type Point = { x: number; y: number };
export interface Sticker {
  id: number;
  path: string;
  position: Point;
}

/* Data sent to postgres must be sent as a DTO */
export type PointDTO = `(${number}, ${number})`;
export interface StickerDTO {
  id: number;
  path: string;
  position: PointDTO;
}

function pointToDTO(point: Point): PointDTO {
  return `(${point.x}, ${point.y})`;
}

const pusher = createClient();

export async function getStickers() {
  const { rows } = await sql<Sticker>`SELECT * FROM stickers`;
  return rows;
}

export async function createSticker({
  path,
  position,
}: Select<Sticker, "path" | "position">) {
  const point = pointToDTO(position);
  const { rows } =
    await sql<Sticker>`INSERT INTO stickers (path, position) VALUES (${path}, ${point}) RETURNING *`;
  await pusher.trigger("sticker_board", "sticker_created", rows[0]);
}

export async function moveSticker({
  id,
  position,
}: Select<Sticker, "id" | "position">) {
  const point = pointToDTO(position);
  const { rows } =
    await sql<Sticker>`UPDATE stickers SET position = ${point} WHERE id = ${id} RETURNING *`;
  await pusher.trigger("sticker_board", "sticker_moved", rows[0]);
}

export async function deleteSticker({ id }: Select<Sticker, "id">) {
  const { rows } =
    await sql<Sticker>`DELETE FROM stickers WHERE id = ${id} RETURNING *`;
  await pusher.trigger("sticker_board", "sticker_deleted", rows[0]);
}
