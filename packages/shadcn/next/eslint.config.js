import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */
export default config = [
  ...nextJsConfig,
  {
    rules: {
      'import/extensions': 'off',
    },
  },
];
