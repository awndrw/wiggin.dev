const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const path = require("path");

const getLocalIdent = require("./scripts/getLocalIdent");

// TODO: Add CSP. Currently blocked by NextJS dev I believe

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    appDir: true,
    scrollRestoration: true,
    typedRoutes: true,
  },
  productionBrowserSourceMaps: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  eslint: {
    // TODO: Errors in Vercel builds but unable to repro locally
    ignoreDuringBuilds: true,
  },
  async headers() {
    const headers = [];
    if (process.env.VERCEL_ENV !== "production") {
      headers.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }
    return headers;
  },
  webpack: (config, { dev }) => {
    const oneOfRule = config.module.rules.find(
      (rule) => typeof rule.oneOf === "object"
    );
    if (!dev && oneOfRule) {
      const rules = oneOfRule.oneOf.filter((rule) => Array.isArray(rule.use));

      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          const isCssLoader = moduleLoader.loader?.includes("css-loader");
          const isPostCssLoader =
            moduleLoader.loader?.includes("postcss-loader");
          if (isCssLoader && !isPostCssLoader) {
            // TODO: Fix getLocalIdent. Collisions happen every other build.
            moduleLoader.options.modules.getLocalIdent = getLocalIdent;
          }
        });
      });
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(config);
