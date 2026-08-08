import next from "eslint-config-next";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...next,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "legacy/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];

export default config;
