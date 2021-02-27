module.exports = {
    env: {
      browser: true
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'airbnb-typescript',
    ],
    parserOptions: {
      ecmaVersion: 6,
      project: './tsconfig.json',
    },
    rules: {
      "@typescript-eslint/indent": ["error", 4],
      "react/jsx-indent": ["error", 4],
      "react/jsx-indent-props": ["error", 4],
      "react/prefer-stateless-function": ["off"],
      "import/extensions": ["off"],
      "react/jsx-one-expression-per-line": ["off"],
      "import/prefer-default-export": ["off"],
      "jsx-a11y/label-has-associated-control": ["off"],
    }
};
  