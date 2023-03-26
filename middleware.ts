import { DEFAULT_LOCALE, LOCALES } from "i18n/constants";
import createIntlMiddleware from "next-intl/middleware";

export default createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  matcher: "/((?!api|.*\\..*|_next).*)",
};
