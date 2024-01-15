import { env } from "constants/env";

export const host = "legacy.awndrw.com";

const protocol = env.isDevelopment ? "http://" : "https://";
export const url = new URL(protocol + host);
