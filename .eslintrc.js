const path = require("path");

const importResolverTypescriptPath = path.resolve(
  "./node_modules/eslint-import-resolver-typescript/lib/index.cjs"
);

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      [importResolverTypescriptPath]: {},
    },
  },
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          ["object", "unknown"],
        ],
        pathGroups: [
          {
            pattern: "react",
            patternOptions: { matchBase: true },
            group: "builtin",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
        },
        warnOnUnassignedImports: true,
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
