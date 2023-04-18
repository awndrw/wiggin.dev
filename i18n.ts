import { getRequestConfig } from "next-intl/server";

import { datadog } from "analytics";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./content/${locale}.json`)).default,
  onError: (error) => {
    datadog.addError(error);
  },
}));
