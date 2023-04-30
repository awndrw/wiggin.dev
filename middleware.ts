import { type NextRequest, NextResponse } from "next/server";

import { StorageKey } from "store/constants";
import { parseHue } from "theme/constants";

const IMAGES = ["icon", "apple-icon", "opengraph-image"];

export default function middleware(req: NextRequest) {
  const hueInPath = req.nextUrl.pathname.match(/^\/([1-9][0-9]{0,2})/)?.[1];
  const hueCookie = req.cookies.get(StorageKey.HUE_REDIRECT)?.value;

  // match all image paths and exit early. we don't want to hide the hue path
  if (IMAGES.some((image) => req.nextUrl.pathname.includes(image))) {
    if (!hueInPath) {
      // direct to image – get hue cookie or random hue and redirect to /[hue]/pathname
      const hue = parseHue(hueCookie);
      const url = req.nextUrl.clone();
      url.pathname = `/${hue}` + req.nextUrl.pathname;
      const res = NextResponse.redirect(url);
      res.cookies.set(StorageKey.HUE_REDIRECT, "");
      return res;
    }
    return NextResponse.next();
  }

  if (!hueInPath) {
    // direct to url – get hue cookie or random hue and rewrite to /[hue]/pathname
    const hue = parseHue(hueCookie);
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
  matcher: ["/((?!api|_next|robots|sitemap|favicon|AndrewWigginResume).*)"],
};
