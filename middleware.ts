import { type NextRequest, NextResponse } from "next/server";

import { StorageKey } from "store/constants";
import { parseHue, HueSchema } from "theme/constants";

const getRandomHue = () => HueSchema.parse(Math.floor(Math.random() * 120));

export default function middleware(req: NextRequest) {
  const hueInPath = req.nextUrl.pathname.match(/^\/([0-9]{1,3})/)?.[1];
  const hueCookie =
    req.cookies.get(StorageKey.HUE_REDIRECT)?.value || undefined;

  if (!hueInPath) {
    // direct to url – get hue cookie or random hue and rewrite to /[hue]/pathname
    const hue = parseHue(hueCookie, getRandomHue());
    const url = req.nextUrl.clone();
    url.pathname = `/${hue}` + req.nextUrl.pathname;
    const res = NextResponse.rewrite(url);
    res.cookies.set(StorageKey.HUE_REDIRECT, "");
    return res;
  } else {
    // url with hue – redirect to /pathname with hue cookie
    const hue = parseHue(hueInPath);
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.slice(hue.toString().length + 1);
    const res = NextResponse.redirect(url);
    res.cookies.set(StorageKey.HUE_REDIRECT, hue.toString());
    return res;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next|robots|sitemap|manifest|favicon|icon|AndrewWigginResume).*)",
  ],
};
