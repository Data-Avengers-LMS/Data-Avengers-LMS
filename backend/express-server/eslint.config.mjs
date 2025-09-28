import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      'import/no-unresolved': 'off',
      'no-console': 'off'
    }
  }
];
