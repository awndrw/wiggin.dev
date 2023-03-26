import { type Metadata } from "next";
import { cookies as nextCookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import { ReactWrapProvider } from "client/ReactWrapProvider";
import { Provider as TooltipProvider } from "client/radix/Tooltip";
import { ActionBar } from "components/ActionBar";
import { Analytics } from "components/Analytics";
import { hyenaSunrise } from "fonts/hyena";
import { type Locale, LOCALES } from "i18n/constants";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { StorageKey } from "store/constants";
import { createStyles } from "theme";
import { DEFAULT_HUE, DEFAULT_MODE, HueSchema } from "theme/constants";
import { hueId, getHexForColor } from "theme/utils";
import { env } from "utils/env";

import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: {
      default: "wiggin.dev",
      template: "wiggin.dev/%s",
    },
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.webmanifest",
  };
}

// https://github.com/vercel/next.js/issues/43427
export const generateStaticParams =
  env !== "development"
    ? () => LOCALES.map((locale) => ({ locale }))
    : undefined;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  const cookies = nextCookies();
  const hueCookie = cookies.get(StorageKey.HUE)?.value;
  const parsedHue = hueCookie ? HueSchema.safeParse(parseInt(hueCookie)) : null;
  const hue = parsedHue?.success ? parsedHue.data : DEFAULT_HUE;

  const isAndrew = Boolean(cookies.get(StorageKey.IS_ANDREW)?.value);

  return (
    <html lang={locale}>
      <head>
        <style
          id={hueId(hue)}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: createStyles(hue) }}
        />
        <meta
          name="theme-color"
          content={getHexForColor(hue, DEFAULT_MODE, "primary")}
        />
      </head>
      <body className={hyenaSunrise.className} data-hue={hue}>
        <TooltipProvider>
          <ReactWrapProvider>{children}</ReactWrapProvider>
        </TooltipProvider>
        <ActionBar />
        {!isAndrew && <Analytics locale={locale} />}
      </body>
    </html>
  );
}
