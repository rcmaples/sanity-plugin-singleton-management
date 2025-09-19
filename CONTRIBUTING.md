# Contributing

## Development Setup

```bash
npm install
npm run test
npm run build
npm run lint
```

## Testing
- Run tests: `npm test`
- Run with coverage: `npm run test:coverage`
- Watch mode: `npm run test:ui`

## Building
- Build: `npm run build`
- Watch: `npm run watch`

## Code Quality
- Lint: `npm run lint`
- Format: `npm run format`

## Commit Messages
This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit message standardization. Commit messages are automatically validated using commitlint.

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
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples
```bash
feat: add singleton document type validation
fix: resolve duplicate document creation issue
docs: update README with new configuration options
test: add tests for document action filtering
chore: update dependencies to latest versions
```

### Rules
- Use lowercase for type
- Keep subject line under 72 characters
- Don't end subject line with a period
- Use imperative mood ("add" not "adds" or "added")

## Testing in Studio
```bash
npm run link-watch
# In studio directory:
npx yalc add sanity-plugin-singleton-management && npm install
```

## Pull Request Process
1. All PRs require at least 1 approving review
2. All CI checks must pass (linting, tests, build, security audit)
3. Commit messages are validated using conventional commits
4. Branch protection prevents direct pushes to main

## Dependabot
- Minor/patch updates are automatically merged after CI passes
- Major updates require manual review and approval
- Weekly dependency update schedule

## Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Run `npm run build` and `npm test`
4. Commit and tag: `git tag v1.x.x`
5. Push: `git push --tags`
6. GitHub Actions will automatically publish to NPM