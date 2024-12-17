import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintrcAutoImport from './.wxt/eslint-auto-imports.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [

  {
    ignores: ['.output/', '.wxt/'],
  },
  eslintrcAutoImport,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        module: false,
      },
    },
  },
  {
    ...pluginJs.configs.recommended,
    ...eslintPluginPrettierRecommended,
    plugins: {
      ...eslintPluginPrettierRecommended.plugins,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
