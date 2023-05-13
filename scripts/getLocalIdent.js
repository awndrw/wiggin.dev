const path = require("path");

const loaderUtils = require("loader-utils");

/**
 * @param {Object} context
 * @param {string} context.rootContext
 * @param {string} context.resourcePath
 * @param {string} localName
 * @param {unknown} _
 */
module.exports = function getLocalIdent(context, _, localName) {
  return loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, "/")}#className:${localName}`
      ),
      "md4",
      "base64",
      6
    )
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .replace(/^(-?\d|--)/, "_$1");
};
