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

- Built using `@sanity/plugin-kit` with TypeScript
- Uses ESLint with Sanity's configuration and Prettier for code formatting
- Supports both Sanity v3 and v4 through peer dependencies
- Plugin includes v2 incompatibility handling via `sanity.json` and `v2-incompatible.js`