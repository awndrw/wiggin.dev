import { NextResponse } from "next/server";

import { createClient, getUser } from "stickerboard/server";

const pusher = createClient();

export async function POST(req: Request): Promise<Response> {
  const queryString = await req.text();
  const params = new URLSearchParams(queryString);
  const socket_id = params.get("socket_id");

  if (!socket_id) {
    // TODO: This shouldn't be 403
    return new Response("Unauthorized", {
      status: 403,
    });
  }

  const user = await getUser();

  try {
    const authResponse = pusher.authenticateUser(socket_id, user);
    return NextResponse.json(authResponse);
  } catch {
    return new Response("Unauthorized", {
      status: 403,
    });
  }
}
