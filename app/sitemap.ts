import { type MetadataRoute } from "next";

import { Route, RouteLastModified, RoutePath } from ".types/routes";
import { url } from "constants/url";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  return Object.values(Route).map((route) => {
    const path = RoutePath[route];
    const lastModifiedTimestamp = RouteLastModified[route];
    return {
      url: new URL(path, url).href,
      lastModified: new Date(parseInt(lastModifiedTimestamp)),
    };
  });
}
