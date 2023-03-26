import "@total-typescript/ts-reset";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type Messages = typeof import("./content/en.json");
declare global {
  type IntlMessages = Messages;
}
