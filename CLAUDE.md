# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Sanity Studio v3 plugin called `sanity-plugin-singleton-management` that provides utilities for managing singleton documents in Sanity Studio. The plugin reduces overhead when creating single-edit documents by restricting actions and providing convenient structure helpers.

## Development Commands

- `npm run build` - Build the plugin for distribution (includes cleaning, verification, and packaging)
- `npm run clean` - Remove dist directory
- `npm run lint` - Run ESLint on the codebase
- `npm run format` - Format code using Prettier
- `npm run watch` - Watch mode for development with hot reloading
- `npm run link-watch` - Link and watch for development with hot reloading in a Sanity Studio

## Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with automated validation via commitlint. All commits must follow the format: `<type>: <description>` (e.g., `feat: add new functionality`, `fix: resolve bug`, `docs: update README`). The commit-msg hook will automatically validate your commit messages.

## Architecture

### Core Plugin Structure

The plugin is built using Sanity's `definePlugin` API and consists of:

1. **Plugin Configuration** (`src/pluginConfig.ts`) - Main plugin entry point that registers document actions and new document options
2. **Document Actions** (`src/actions.ts`) - Restricts singleton documents to only allow publish, discardChanges, and restore actions
3. **New Document Options** (`src/newDocumentOptions.ts`) - Filters singleton documents from global and context-specific creation menus
4. **Structure Helpers** (`src/structure/index.ts`) - Utilities for customizing how singletons appear in Studio structure

### Key Components

- **Helpers** (`src/helpers/index.ts`):
  - `getSingletonDocuments()` - Extracts singleton document types from schema
  - `getIsSingleton()` - Checks if a document type is configured as singleton

- **Structure Functions**:
  - `singletonDocumentListItem()` - Creates individual singleton list items
  - `singletonDocumentListItems()` - Creates list items for all singletons in schema
  - `filteredDocumentListItems()` - Filters out singletons from default document lists

### Singleton Identification

Documents are identified as singletons by adding `options: { singleton: true }` to their schema definition. The plugin uses Sanity's internal schema structure (`schema._original.types`) to detect these configurations.

### Type Definitions

The plugin extends Sanity's type system through module augmentation to add singleton options to `DocumentOptions` interface, ensuring proper TypeScript support.

## Plugin Integration

Users integrate this plugin by:
1. Adding `singletonTools()` to their Sanity config plugins array
2. Marking document schemas with `options: { singleton: true }`
3. Using the exported structure helpers in their Studio structure configuration

## Development Notes

- Built using `@sanity/plugin-kit` with TypeScript and ESM
- Uses ESLint v9 flat config with Prettier formatting
- Comprehensive test suite with Vitest (46 tests)
- Supports React 18/19 and Sanity v3/v4 through peer dependencies
- ESM package with dual CJS/ESM exports for maximum compatibility

## Maintenance

### Testing
- `npm test` - Interactive test runner
- `npm run test:run` - Single test run
- `npm run test:coverage` - Coverage reports

### Dependencies
- Dependabot configured for weekly updates
- Manual updates: check compatibility with Sanity ecosystem first
- Test against both React 18 and 19 when updating React types

### Branch Protection & CI/CD
- Main branch protected with required status checks
- All PRs require 1 approving review
- CI validates: commit messages, security audits, linting, tests, builds
- Dependabot auto-merges minor/patch updates, flags major updates

### Release Process
1. Update version and CHANGELOG.md
2. Ensure CI passes on all Node versions (18, 20, 22)
3. Tag release: `git tag v1.x.x && git push --tags`
4. GitHub Actions will automatically publish to NPM