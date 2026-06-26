import { defineConfig } from 'eslint/config';
import jseslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default defineConfig({
  files: ['**/*.{js,ts}'],
  ignores: ['dist/**', 'node_modules/**'],
  extends: [jseslint.configs.recommended, tseslint.configs.recommendedTypeChecked, eslintPluginPrettierRecommended],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
  },
});
