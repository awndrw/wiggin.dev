const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const { getLocalIdentName } = require("css-loader-shorter-classnames");

const getLocalIdent = getLocalIdentName();

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
    nextScriptWorkers: true,
  },
  productionBrowserSourceMaps: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
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
            moduleLoader.options.modules.getLocalIdent = getLocalIdent;
          }
        });
      });
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(config);
