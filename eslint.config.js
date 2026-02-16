import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**', 
      './src/db/schemas/**',
      './drizzle.config.ts',
    ],
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {},
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,

  prettier,
)
