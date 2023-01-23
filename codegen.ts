import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://graphql.datocms.com": {
      headers: {
        Authorization: process.env.DATOCMS_READONLY_TOKEN!,
      },
    },
  },
  documents: "./src/cms/**/*.gql",
  generates: {
    "./src/cms/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
  config: {
    dedupeFragments: true,
    pureMagicComment: true,
    exportFragmentSpreadSubTypes: true,
    useTypeImports: true,
    enumsAsConst: true,
  },
};

export default config;
