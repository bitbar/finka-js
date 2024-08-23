import globals from 'globals';
import tseslint from 'typescript-eslint';


export default [
  {
    ignores: ['**/node_modules/**', 'dist/*', 'docs/*']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  ...tseslint.configs.recommended,
  {
    files: ['test/*.js'],
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    files: ['types/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  },
];
