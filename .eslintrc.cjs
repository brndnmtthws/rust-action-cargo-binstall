module.exports = {
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:github/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  rules: { 'i18n-text/no-en': 'off', semi: 'off' },
  env: {
    node: true,
    es6: true
  },
  overrides: [
    {
      files: ['tests/**/*.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      env: {
        'jest/globals': true,
        node: true,
        es6: true
      }
    },
    {
      files: ['**/*.cjs'],
      plugins: ['prettier'],
      extends: ['standard', 'prettier'],
      rules: { 'filenames/match-regex': 'off', 'import/no-commonjs': 'off' },
      env: {
        commonjs: true,
        node: true,
        es6: true
      },
      parser: 'espree'
    }
  ]
}
