import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,

  // Airbnb base rules
  ...compat.extends('airbnb-base'),

  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      // Force single quotes
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      // JSX attributes use double quotes (Airbnb standard)
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },

  // TypeScript files with Airbnb TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // Force single quotes in TypeScript files too
      quotes: 'off', // Turn off base rule
      '@typescript-eslint/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      // JSX attributes use double quotes (Airbnb standard)
      'jsx-quotes': ['error', 'prefer-double'],
      // Never require extensions for TypeScript files
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
  },

  // Redux Toolkit specific rules
  {
    files: ['**/redux-toolkit/**/*.ts'],
    rules: {
      'no-param-reassign': 'off',
    },
  },

  eslintConfigPrettier,

  {
    ignores: ['dist/**', 'node_modules/**', '**/*.js', '**/*.jsx', 'JS/**'],
  },
];
