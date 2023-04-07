import { globby } from "globby";

import { DEFAULT_LOCALE, type Locale, LOCALES } from "i18n/constants";

const createPath = (path: string, locale?: Locale) => {
  const localeSegment =
    !locale || locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const pathSegment = path === "" ? "" : `/${path}`;
  return `https://wiggin.dev${localeSegment}${pathSegment}`;
};

function format(html: string) {
  const tab = "  ";
  let result = "";
  let indent = "";
  html.split(/>\s*</).forEach(function (element) {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    result += indent + "<" + element + ">\r\n";
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += tab;
    }
  });
  return result.substring(1, result.length - 3);
}

function alternate(path: string, locale: Locale) {
  const href = createPath(path, locale);
  return `<xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />`;
}

function defaultAlt(path: string) {
  const href = createPath(path);
  return `<xhtml:link rel="alternate" hreflang="x-default" href="${href}" />`;
}

function createPage(filePath: string) {
  // the index page will not match this regex, so we use ""
  const path = filePath.match(/^app\/\[locale\]\/(.+?)\/page\.tsx$/)?.[1] ?? "";
  return LOCALES.map((locale) => [
    "<url>",
    `<loc>${createPath(path, locale)}</loc>`,
    LOCALES.map((locale) => alternate(path, locale)),
    defaultAlt(path),
    "</url>",
  ]);
}

export async function GET() {
  const pages = await globby(["app/[locale]/**/page.tsx"]);
  const pageUrls = pages.map(createPage).flat(Infinity);
  const res = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pageUrls.join("")}
</urlset>`;
  return new Response(format(res));
}
