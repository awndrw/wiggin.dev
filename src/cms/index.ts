import { GraphQLClient } from "graphql-request";
import { env } from "utils/env";
import { getSdk } from "./generated";

export const DATOCMS_ENDPOINT =
  process.env.NODE_ENV == "production"
    ? "https://graphql.datocms.com"
    : "https://graphql.datocms.com/preview";

export const DATOCMS_HEADERS = {
  Authorization: env.DATOCMS_READONLY_TOKEN,
};

export const client = new GraphQLClient(DATOCMS_ENDPOINT, {
  headers: DATOCMS_HEADERS,
});

export const sdk = getSdk(client);
