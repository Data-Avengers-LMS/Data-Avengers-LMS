import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */

export default [
  ...nextJsConfig,
  {
    rules: {
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'arrow-body-style': 'off',
    },
  },
];
