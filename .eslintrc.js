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
  ]
}