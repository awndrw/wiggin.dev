const path = require("path");
const loaderUtils = require("loader-utils");

/**
 * @param {string} str A hashed classname
 * @returns A valid css classname scrubbed of all invalid characters.
 */
const scrub = (str) => {
  return str
    .replace(/^(-?\d|--)/, "_$1")
    .replaceAll("+", "_")
    .replaceAll("/", "-");
};

const hashOnlyIdent = (context, _, exportName) => {
  const hash = loaderUtils.getHashDigest(
    Buffer.from(
      `filePath:${path
        .relative(context.rootContext, context.resourcePath)
        .replace(/\\+/g, "/")}#className:${exportName}`
    ),
    "md4",
    "base64",
    6
  );
  return scrub(hash);
};

// TODO: Add CSP. Currently blocked by NextJS dev I believe

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|txt)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

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
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
          }
        });
      });
    }
    return config;
  },
};

module.exports = nextConfig;
