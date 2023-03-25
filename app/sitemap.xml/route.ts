import { globby } from "globby";

function createPage(filePath: string) {
  // the index page will not match this regex, so we use ""
  const path = filePath.match(/^app\/(.+?)\/page\.tsx$/)?.[1] ?? "";
  return `  <url>
    <loc>https://wiggin.dev/${path}</loc>
  </url>`;
}

export async function GET() {
  const pages = await globby(["app/**/page.tsx"]);
  const pageUrls = pages.map(createPage);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageUrls.join("\n")}
</urlset>`);
}
