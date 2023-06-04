import { NextResponse } from "next/server";

import { createClient, getUser } from "stickerboard/server";

const pusher = createClient();

export async function POST(req: Request) {
  const queryString = await req.text();
  const params = new URLSearchParams(queryString);
  const socket_id = params.get("socket_id");
  const channel_name = params.get("channel_name");

  if (!socket_id || !channel_name) {
    // TODO: This shouldn't be 403
    return new Response("Unauthorized", {
      status: 403,
    });
  }

  const { id, ...rest } = await getUser();

  // This authenticates every user. Don't do this in production!
  try {
    const authResponse = pusher.authorizeChannel(socket_id, channel_name, {
      user_id: id,
      user_info: rest,
    });
    return NextResponse.json(authResponse);
  } catch {
    return new Response("Unauthorized", {
      status: 403,
    });
  }
}
