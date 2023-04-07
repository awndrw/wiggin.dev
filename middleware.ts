import createIntlMiddleware from "next-intl/middleware";

import { DEFAULT_LOCALE, LOCALES } from "i18n/constants";

export default createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  matcher: [
    "/((?!api|.*\\..*|_next|opengraph-image).*)", // Match all routes except api, files, _next, and og
  ],
};
