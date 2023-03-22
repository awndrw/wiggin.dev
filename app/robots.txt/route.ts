import {env} from "utils/env";

function createRobotsTxt(noIndex: boolean) {
  return `User-agent: *
Disallow: ${noIndex ? '/' : ''}
Sitemap: https://wiggin.dev/sitemap.xml`;
}

export async function GET() {
  return new Response(createRobotsTxt(env !== "production"));
}
