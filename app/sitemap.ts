import { type MetadataRoute } from "next";

import { Route, routeIds, RouteLastModified } from ".types/routes";
import { url } from "constants/url";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  return routeIds.map((routeId) => {
    const path = Route[routeId];
    const lastModifiedTimestamp = RouteLastModified[routeId];
    return {
      url: new URL(path, url).href,
      lastModified: new Date(parseInt(lastModifiedTimestamp)),
    };
  });
}
