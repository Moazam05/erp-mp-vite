module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": "error",
    "react/prop-types": "off", // Disable prop types as error
    "no-constant-condition": "off", // Add this line to disable the error
    "react/no-unescaped-entities": "off", // Add this line to disable the error
    "react-hooks/exhaustive-deps": "off", // Add this line to disable the warning
  },
};
