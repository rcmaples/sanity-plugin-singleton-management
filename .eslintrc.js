module.exports = {
  extends: [
    'sanity',
    'sanity/typescript',
    'sanity/react',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error'
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.js'
  ],
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/__mocks__/**/*', '**/*.test.*', '**/*.spec.*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'max-nested-callbacks': 'off'
      }
    }
  ]
}