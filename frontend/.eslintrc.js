module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
  ],
  rules: {
    indent: ['error', 2],
    'no-multi-spaces': ['error'],
    'react/style-prop-object': ['off'],
    'no-console': 'off',
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'object-curly-newline': ['error'],
    'no-use-before-define': 'off',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-max-props-per-line': ['error',
      {
        maximum: 1,
      },
    ],
    'react/jsx-one-expression-per-line': ['error', { allow: 'literal' }],
  },
};
