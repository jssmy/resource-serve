module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'no-commented-code'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // Detectar variables sin declarar
    'no-undef': 'error',
    // Detectar variables e importaciones sin usar
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        args: 'after-used',
        vars: 'all',
      },
    ],
    // Detectar importaciones sin usar
    'no-unused-vars': 'off', // Desactivamos la regla base para usar la de TypeScript
    // Prohibir console.log (permitir console.error y console.warn)
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    // Prohibir código comentado
    'no-commented-code/no-commented-code': 'error',
    // Detectar comentarios que parecen código ejecutable
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'fixme', 'xxx', 'hack'],
        location: 'anywhere',
      },
    ],
    // Convención de nombres: variables en camelCase
    '@typescript-eslint/naming-convention': [
      'error',
      {
        // Variables exportadas (decoradores) pueden ser PascalCase
        selector: 'variable',
        modifiers: ['exported'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        // Variables no exportadas deben ser camelCase o UPPER_CASE
        selector: 'variable',
        modifiers: [],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        // Parámetros de función deben ser camelCase
        selector: 'parameter',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        // Funciones deben ser camelCase
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        // Clases deben ser PascalCase
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        // Interfaces deben ser PascalCase
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        // Tipos deben ser PascalCase
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        // Enums deben ser PascalCase
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        // Propiedades de objetos deben ser camelCase
        selector: 'objectLiteralProperty',
        format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'],
      },
      {
        // Propiedades de clases deben ser camelCase (privadas pueden tener _)
        selector: 'classProperty',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],
  },
};
