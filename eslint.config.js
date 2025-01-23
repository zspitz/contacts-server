import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        'rules': {
            'no-unused-vars': ['error', {
                'vars': 'all',
                'args': 'after-used',
                'caughtErrors': 'all',
                'ignoreRestSiblings': true,
                'reportUsedIgnorePattern': false
            }],
            'no-empty': ['error', {
                'allowEmptyCatch': true
            }],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'never'],
            'curly': ['error', 'all']
        }
    }
];
