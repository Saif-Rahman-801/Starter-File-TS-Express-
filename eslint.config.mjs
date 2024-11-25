import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Ensure @typescript-eslint is properly imported
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier"; // Use eslint-config-prettier instead

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      globals: { 
        ...globals.browser,
        process: "readonly",
      },
    },
    ignores: [".node_modules/*", "dist/*"],
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig,  // Use prettierConfig to disable conflicting rules with Prettier
  {
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting as ESLint rules
    },
  }
];
