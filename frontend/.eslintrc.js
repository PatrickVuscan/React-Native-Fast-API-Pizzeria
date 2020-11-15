module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
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
    'react-hooks',
    'import',
    'import-newlines',
  ],
  rules: {
    indent: ['error', 2],
    quotes: ['off'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'consistent-return': ['off'],
    'no-multi-spaces': ['error'],
    'react/style-prop-object': ['off'],
    'no-console': 'off',
    'no-use-before-define': 'off',
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: true,
    }],
    'no-nested-ternary': ['warn'],
    'lines-between-class-members': ["error", "always", { exceptAfterSingleLine: true }],
    'no-unused-expressions': ["error", { allowTernary: true, allowShortCircuit: true }],
    'no-unused-vars': ['warn', {
      vars: 'local', args: 'after-used', ignoreRestSiblings: true, caughtErrors: "none",
    }],
    'react/prop-types': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/destructuring-assignment': ['off'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-closing-tag-location': ['error'],
    'react/jsx-max-props-per-line': ['error', {
      maximum: 1,
    }],
    'react/jsx-one-expression-per-line': ['error', {
      allow: 'literal',
    }],
    'react/jsx-curly-brace-presence': ['off'],
    'react/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
  },
};
