//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

// Extend TanStack's flat config with a few project-specific tweaks.
export default [
  ...tanstackConfig,
  // Ensure JS config files use the default parser instead of @typescript-eslint/parser
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      parser: espree,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module'
      }
    }
  },
  // Ignore build artifacts and vendor files
  {
    ignores: ['dist', 'build', 'node_modules', 'eslint.config.js', 'prettier.config.js']
  },
  // Project rules and environment
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      // Define common browser globals to reduce noise
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      // Keep console for debugging, but surface as warnings
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Relax a few strict rules to ease adoption
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      'import/order': 'off',
      'import/consistent-type-specifier-style': 'off',
      'sort-imports': 'off',
      '@stylistic/spaced-comment': 'off'
    }
  }
]
