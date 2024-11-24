import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
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
  ...tseslint.configs.recommended,
  ...prettierConfig,  // Add Prettier's recommended configuration here
];
