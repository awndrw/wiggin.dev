import { registerOTel } from "@vercel/otel";

import { host } from "constants/url";

export function register() {
  registerOTel(host);
}
