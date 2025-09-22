# 🔍 ESLint & Husky Setup Guide

## Overview

This monorepo uses ESLint for code quality and Husky for git hooks to maintain consistent code standards across all packages.

## ESLint Configuration

### Structure

```
packages/eslint-config/
├── base.js           # Base ESLint config with Airbnb rules
├── next.js           # Next.js specific config
├── react-internal.js # React library config
└── package.json      # ESLint dependencies
```

### Configurations

#### Base Config (`base.js`)

- **Airbnb JavaScript rules** via FlatCompat
- **TypeScript support** for `.ts`/`.tsx` files
- **Turbo plugin** for monorepo-specific rules
- **Prettier integration** to avoid conflicts

#### Next.js Config (`next.js`)

- Extends base config
- Adds Next.js specific rules
- React and React Hooks support
- Browser and Node.js globals

#### React Internal Config (`react-internal.js`)

- Extends base config
- React library specific rules
- Component development focused

### How ESLint Works

#### File-based Configuration

```javascript
// For JavaScript files
"no-unused-vars": "error"
"prefer-const": "error"

// For TypeScript files (.ts/.tsx)
"@typescript-eslint/no-unused-vars": "error"
"@typescript-eslint/no-explicit-any": "warn"
```

#### Usage Across Apps

- **Web App**: Uses `@repo/eslint-config/next-js`
- **Docs App**: Uses `@repo/eslint-config/next-js`
- **UI Package**: Uses `@repo/eslint-config/react-internal`
- **Express Server**: Uses `@repo/eslint-config/base`

## Husky Git Hooks

### Hook Configuration

#### Pre-commit (`.husky/pre-commit`)

```bash
npx lint-staged
```

**What it does:**

- Runs ESLint with `--fix` on staged JS/TS files
- Runs Prettier on staged files
- Only processes changed files (fast!)

#### Commit-msg (`.husky/commit-msg`)

```bash
npx --no -- commitlint --edit $1
```

**What it does:**

- Validates commit message format
- Enforces Conventional Commits standard
- Rejects improperly formatted messages

#### Pre-push (`.husky/pre-push`)

```bash
npm run lint
npm run check-types
```

**What it does:**

- Runs full ESLint check across all packages
- Runs TypeScript type checking
- Ensures code quality before pushing

### Lint-staged Configuration

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## VS Code Integration

### Settings (`.vscode/settings.json`)

```json
{
  "eslint.useFlatConfig": true,
  "eslint.validate": ["typescript", "typescriptreact"],
  "eslint.run": "onType",
  "errorLens.enabled": true
}
```

### What You'll See

- **Red squiggly lines** for ESLint errors
- **Yellow squiggly lines** for ESLint warnings
- **Inline error messages** via Error Lens extension
- **Auto-fix on save** for fixable issues

## Commands

### Manual Linting

```bash
# Lint all packages
npm run lint

# Lint specific package
cd apps/web && npx eslint .

# Fix auto-fixable issues
cd apps/web && npx eslint . --fix
```

### Type Checking

```bash
# Check types across all packages
npm run check-types

# Check specific package
cd apps/web && npx tsc --noEmit
```

### Formatting

```bash
# Format all files
npm run format

# Format specific files
npx prettier --write "src/**/*.{ts,tsx}"
```

## Troubleshooting

### ESLint Not Working in VS Code?

1. Check ESLint extension is installed
2. Reload VS Code window: `Cmd+Shift+P` → "Developer: Reload Window"
3. Check ESLint output: View → Output → Select "ESLint"
4. Restart ESLint server: `Cmd+Shift+P` → "ESLint: Restart ESLint Server"

### Error Lens Not Showing Errors?

1. Install Error Lens extension
2. Check settings: `"errorLens.enabled": true`
3. Ensure ESLint is working first

### Husky Hooks Not Running?

```bash
# Reinstall husky hooks
npx husky install

# Check hook permissions
ls -la .husky/
chmod +x .husky/*
```

### Commit Rejected?

- **ESLint errors**: Fix the errors or run `eslint --fix`
- **Commit message**: Follow conventional commits format
- **Type errors**: Fix TypeScript issues

### Performance Issues?

- ESLint runs only on changed files during commit
- Full lint only runs on push
- Use `--cache` flag for faster subsequent runs

## Adding New Rules

### To Base Config

```javascript
// packages/eslint-config/base.js
rules: {
  "new-rule": "error"
}
```

### To Specific Package

```javascript
// apps/web/eslint.config.js
import { nextJsConfig } from "@repo/eslint-config/next-js";

export default [
  ...nextJsConfig,
  {
    rules: {
      "package-specific-rule": "warn",
    },
  },
];
```

## Benefits

✅ **Consistent code style** across all packages  
✅ **Automatic error fixing** on commit  
✅ **Type safety** enforcement  
✅ **Fast feedback** in VS Code  
✅ **Quality gates** before push  
✅ **Conventional commits** for better git history
