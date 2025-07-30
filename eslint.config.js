import { defineConfig } from '@soybeanjs/eslint-config';
import jsdoc from 'eslint-plugin-jsdoc';

export default defineConfig(
  {
    ignores: ['ErrorBoundary.tsx'],
    prettierRules: {
      singleAttributePerLine: true,
      trailingCommas: 'none',
      printWidth: 120,
      jsdocDescriptionWithDot: false,
      jsdocVerticalAlignment: false
    },
    react: true,
    unocss: true
  },
  {
    rules: {
      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'warn',
      'import/no-empty-named-blocks': ['error'],
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true
        }
      ],

      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc'
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          pathGroups: [{ group: 'internal', pattern: '{{@,~}/,#}**' }],
          pathGroupsExcludedImportTypes: ['builtin']
        }
      ],
      // 只允许 warn 和 error 保留
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'no-underscore-dangle': 'off',

      'no-continue': 'off',

      'react/hook-use-state': [
        'error', // or "warn" to only warn instead of error
        {
          allowDestructuredState: true
        }
      ],
      'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
      'react/jsx-closing-tag-location': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          children: 'never',
          propElementValues: 'always',
          props: 'never'
        }
      ],
      'react/jsx-curly-newline': ['warn', { multiline: 'consistent', singleline: 'consistent' }],
      'react/jsx-equals-spacing': ['warn', 'never'],
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-newline': 'warn',
      'react/jsx-no-undef': ['off'],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-one-expression-per-line': [
        'warn',
        {
          allow: 'single-child'
        }
      ],
      'react/jsx-props-no-multi-spaces': 'warn',
      'react/jsx-sort-props': [
        'warn',
        { callbacksLast: true, ignoreCase: true, multiline: 'last', shorthandFirst: true }
      ],

      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true
        }
      ],

      'react-refresh/only-export-components': [
        'warn',
        { allowExportNames: ['loader', 'action', 'handle', 'shouldRevalidate'] }
      ],

      // JSDoc formatting rules
      'jsdoc/multiline-blocks': ['error', { noZeroLineText: false }],
      'jsdoc/no-multi-asterisks': ['error', { allowWhitespace: true }],
      'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }]
    },
    plugins: {
      jsdoc
    }
  }
);
