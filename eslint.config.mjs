import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [...tseslint.configs.recommended],
  files: ['**/*.ts'],
  ignores: ['node_modules/**', 'dist/**', 'build/**', '.next/**', 'coverage/**'],
});
