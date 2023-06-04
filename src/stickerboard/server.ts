import { sql } from "@vercel/postgres";
import { type RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import Pusher from "pusher";

import { type ServerUser } from "live/types";

import { type User } from "./constants";

export function createClient() {
  return new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  });
}

export async function getUser(
  cookieStore?: RequestCookies | ReadonlyRequestCookies
) {
  if (!cookieStore) {
    cookieStore = cookies();
  }
  const userIdCookie = cookieStore.get("uid");
  let user: ServerUser;
  if (userIdCookie?.value) {
    const { rows } =
      await sql<User>`SELECT * FROM users WHERE id = ${userIdCookie.value}`;
    if (!rows.length) {
      const { rows } =
        await sql<User>`INSERT INTO users (id) VALUES (${userIdCookie.value}) RETURNING *`;
      user = rows[0];
    } else {
      user = rows[0];
    }
  } else {
    const { rows } =
      await sql<User>`INSERT INTO users DEFAULT VALUES RETURNING *`;
    user = rows[0];
  }
  return user;
  /*const { rows } =
    await sql<Animal>`SELECT * FROM animals WHERE active = false ORDER BY random() LIMIT 1`;
  const animal = rows[0];
  await sql`UPDATE animals SET active = true WHERE name = ${animal.name}`;
  return { ...user, animal: animal.name };*/
}
