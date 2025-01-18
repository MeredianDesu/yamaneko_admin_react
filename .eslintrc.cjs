module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  plugins: [
    'import',
    'react',
    'react-hooks',
    'jsx-a11y',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'unused-imports',
    'compat',
    'sonarjs',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:compat/recommended',
    'plugin:sonarjs/recommended-legacy',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/ignore': ['node_modules'],
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/*.js'],
  rules: {
    // for sorting import
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // prettier rules integrate
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-alert': 'error',
    // for alias import
    'import/no-unresolved': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': [
      'error',
      {
        'prefer-inline': true,
      },
    ],
    'import/prefer-default-export': 0,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    // allow to use the 'continue' statement in 'for of' loops without a eslint warning
    'no-continue': 0,
    'import/no-extraneous-dependencies': 'error',
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
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'rest-spread-spacing': ['error', 'never'],
    'global-require': 'off',
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'no-shadow': 'off',
    'space-before-function-paren': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'prefer-const': 'error',
    'no-unused-expressions': [2, { allowTernary: true, allowShortCircuit: true }],
    'no-plusplus': 'off',
    'no-confusing-arrow': 'off',
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    camelcase: 'off',
    'block-spacing': 'error', // { space }
    'new-parens': 'error',
    'new-cap': [
      'error',
      {
        newIsCap: true,
      },
    ],
    'prefer-object-spread': 'off',
    'lines-between-class-members': ['error', 'always'],
    'one-var': ['error', 'never'],
    'no-unneeded-ternary': 'error', // Упрощение тернарных операторов
    'no-nested-ternary': 'error', // Откл вложенные тернарные операторы
    'newline-per-chained-call': ['error'],
    'wrap-regex': 'error',
    'no-underscore-dangle': 'off',
    'max-len': [
      'error',
      {
        code: 110,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignorePattern: '^import .*',
      },
    ],
    // For React
    'react/state-in-constructor': ['error', 'never'],
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/no-find-dom-node': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unused-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'prefer-destructuring': 'off',
    'react/function-component-definition': 'off',
    // For hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'prefer-arrow-callback': 'off',
    'react/jsx-wrap-multilines': [
      'error',
      {
        prop: 'ignore',
      },
    ],
    // PropTypes disable
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/no-danger': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-namespace': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-restricted-syntax': [
      'warn',
      {
        selector: "TSTypeReference[typeName.left.name='React'][typeName.right.name='FC']",
        message:
          'Avoid using React.FC for defining components. Use plain functions with typed props instead.',
      },
      {
        selector: "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
        message: 'Unnecessary \'import React from "react"\'.',
      },
      {
        selector: "TSTypeReference[typeName.name='FC']",
        message:
          'Avoid using React.FC for defining components. Use plain functions with typed props instead.',
      },
    ],
  },
}
