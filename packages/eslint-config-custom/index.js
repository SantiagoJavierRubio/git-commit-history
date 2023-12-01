module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "space-before-function-paren": "off",
    "dot-notation": "off",
    "no-undef": "off",
    "multiline-ternary": "off",
    "no-console": "warn",
    "no-unused-vars": "warn",
    camelcase: "off",
  },
  ignorePatterns: ["**/node_modules/**", "**/build/**"],
};
