export default [
  {
    ignores: ["node_modules/**", "dist/**"]
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        fetch: "readonly",
        process: "readonly",
        URL: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  }
];
