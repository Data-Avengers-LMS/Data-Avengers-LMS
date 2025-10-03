import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ['JS/**/*', '*.config.*']
  },
  {
    rules: {
      'import/no-unresolved': 'off',
      'no-console': 'off',
      'no-param-reassign': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
];
