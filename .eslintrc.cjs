/** Nur das 'Warum': Konsistenz & Fehlerprävention im UI-Build */
module.exports = {
  root: true,
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  env: { browser: true, es2022: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:svelte/recommended",
    "prettier"
  ],
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser"
      }
    }
  ],
  rules: {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
};
