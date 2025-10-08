import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/examples/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
];