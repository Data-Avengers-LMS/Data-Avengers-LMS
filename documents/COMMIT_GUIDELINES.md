# 📝 Commit Guidelines

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scopes (Optional)

- **web**: Changes to web app
- **docs**: Changes to docs app
- **ui**: Changes to UI package
- **eslint-config**: Changes to ESLint configuration
- **typescript-config**: Changes to TypeScript configuration
- **express-server**: Changes to Express server
- **redis-server**: Changes to Redis server
- **socketio-server**: Changes to Socket.IO server

### Examples

#### Good Commits ✅

```bash
feat(web): add user authentication
fix(ui): resolve button styling issue
docs: update README with setup instructions
refactor(express-server): optimize database queries
style(web): format code with prettier
test(ui): add unit tests for Button component
chore: update dependencies
```

#### Bad Commits ❌

```bash
update stuff
fix bug
added new feature
WIP
asdf
```

## How to Commit

### 1. Stage your changes

```bash
git add .
```

### 2. Commit with proper message

```bash
git commit -m "feat(web): add user dashboard"
```

### 3. Push your changes

```bash
git push
```

## What Happens During Commit

### Pre-commit Hook

1. **Lint-staged** runs on staged files:
   - ESLint fixes JavaScript/TypeScript issues
   - Prettier formats code
   - Only processes changed files for speed

### Commit-msg Hook

1. **Commitlint** validates your commit message:
   - Checks format follows conventional commits
   - Ensures proper type and description
   - Rejects invalid commit messages

### Pre-push Hook

1. **Full linting** across all packages
2. **Type checking** for TypeScript files
3. Ensures code quality before pushing

## Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit hooks
git commit --no-verify -m "emergency fix"

# Skip pre-push hooks
git push --no-verify
```

⚠️ **Use sparingly** - Only for emergency hotfixes!

## Troubleshooting

### Commit message rejected?

- Check the format matches: `type(scope): description`
- Use lowercase for type and description
- Keep description under 72 characters

### ESLint errors during commit?

- Fix the errors manually, or
- Run `npm run lint` to see all issues
- Some issues auto-fix, others need manual fixes

### Type errors during push?

- Run `npm run check-types` locally
- Fix TypeScript errors before pushing
