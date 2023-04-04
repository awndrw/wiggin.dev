import { datadog } from "analytics";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./content/${locale}.json`)).default,
  onError: (error) => {
    datadog.addError(error);
  },
}));
