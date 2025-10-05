import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: [
      '**/*.js',
      '**/*.jsx',
      '**/JS/**',
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
];
