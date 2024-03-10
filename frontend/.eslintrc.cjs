module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "airbnb",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react/jsx-props-no-spreading": "off",
    "no-unneeded-ternary": "off",
    "arrow-body-style": "off",
    "prefer-destructuring": ["off"],
    "padded-blocks": ["off"],
    "no-case-declarations": "off",
    "no-restricted-syntax": "off",
    "import/extensions": "off",
    "react/function-component-definition": "off",
    "import/no-extraneous-dependencies": "off",
    "no-unused-vars": "off",
    "no-new": "off",
    "operator-linebreak": "off",
    "implicit-arrow-linebreak": "off",
    quotes: "off",
    "linebreak-style": "off",
    "object-curly-newline": "off",
    "max-len": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/control-has-associated-label": "warn",
    "no-trailing-spaces": "warn",
    "react/no-unknown-property": "warn",
    "react/jsx-filename-extension": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "react/prop-types": "off",
    "no-plusplus": "off",
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    indent: ["off"],
    "import/no-unresolved": [2, { caseSensitive: false }],
  },
};
