import milliseconds from "milliseconds";
import { NextResponse } from "next/server";
import { StorageKey } from "utils/constants";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  let uid = req.cookies.get(StorageKey.USER_ID)?.value;

  if (!uid) {
    uid = crypto.randomUUID();
  }

  const res = NextResponse.next();
  res.cookies.set({
    name: StorageKey.USER_ID,
    value: uid,
    maxAge: milliseconds.months(6),
  });

  return res;
}
