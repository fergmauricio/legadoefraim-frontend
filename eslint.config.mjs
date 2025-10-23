import storybook from "eslint-plugin-storybook";
import vitest from "eslint-plugin-vitest-globals";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  ...storybook.configs["flat/recommended"],

  {
    files: ["**/*.test.{ts,tsx}"],
    plugins: { vitest },
    languageOptions: {
      globals: vitest.environments.env.globals,
    },
    rules: {
      "vitest/no-focused-tests": "error",
    },
  },
];

export default eslintConfig;
