## [1.0.1](https://github.com/rcmaples/sanity-plugin-singleton-management/compare/v1.0.0...v1.0.1) (2025-10-23)


### Bug Fixes

* force minor release ([6daab91](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/6daab91073ab464e95ea111f978679b4e6cdd66a))

# 1.0.0 (2025-09-19)


### Bug Fixes

* adding node 22 to test matrix ([04838d6](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/04838d63f5737893cf38c516eb6812f7c4709b0e))
* broken release issue with semantic-release ([9f10fff](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/9f10fffc4d65a163e711818131fc56d2d1e76192))
* ignoring legacy commits ([154b0f1](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/154b0f1e78da07517211060df39969a5f423affe))
* removing commitlint from release ([df30931](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/df3093147d2f5e07fe268e13acf10477497c1a56))
* return type of singletonDocumentListItems ([240d194](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/240d194d4c80c07744a4be708cc094f73d50a0ff))
* trying to fix github test action ([7606c13](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/7606c13a44495a7a95a04efd972577659fdcf277))
* **types:** allow ReactNode type for list item icons ([65f1b75](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/65f1b75c87641909349a21a0941ce8b09ca7ec71))
* updating github ci workflow ([2b1fb99](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/2b1fb993bf0ceba37c19ada32d612b37690ad25d))


### Features

* add npm publishing and CI/CD enhancements ([09817a1](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/09817a1f0326ea5ec79d7ae555a3c340152a1f2c))
* adding codecov ([6b34307](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/6b343071222be5728ed2fb7f6eb7d29da6fa402f))
* implement semantic-release for automated publishing ([223fa85](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/223fa859f3dabdca7162d9a1beb9d832cc798c36))
* remove unpublish option for singletons ([ddd892b](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/ddd892b5016b31345db5605ebaf91afe13518e6e))
* upgrade to ESM, React 19, and modern tooling ([24d8fdd](https://github.com/rcmaples/sanity-plugin-singleton-management/commit/24d8fdd9d0881a3a2d60efa9e1d7c5c8d5f94853))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive test suite with 46 tests using Vitest
- ESM support with dual CJS/ESM exports
- Coverage reporting
- Modern ESLint v9 flat config

### Changed

- Upgraded to React 19 in devDependencies
- Updated TypeScript ESLint to v8
- Improved build process with latest Sanity tooling

### Fixed

- Resolved Vite CJS deprecation warnings
- Enhanced TypeScript compatibility

## [1.2.0] - Previous Release

- Updated peerDependencies for broader compatibility (React 18/19, Sanity 3/4)
