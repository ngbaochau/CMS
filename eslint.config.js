// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser';

/**
 * Regex bắt các ký tự tiếng Việt có dấu như: ă â đ ê ô ơ ư á à ấ ầ é è...
 * Dùng để bắt mọi `Literal` hoặc `TemplateLiteral` chứa tiếng Việt
 */
const vietnameseCharRegex =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

export default [
  js.configs.recommended,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      // ❌ Cấm dùng console và debugger
      'no-console': 'error',
      'no-debugger': 'error',

      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],

      // ❌ Cấm require
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name="require"]',
          message: '❌ Không được dùng require. Hãy dùng import.',
        },
        {
          selector: 'LineComment, BlockComment',
          message: '❌ Không được dùng comment.',
        },
        {
          selector:
            'Literal[value=/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu]',
          message: '❌ Không được dùng tiếng Việt.',
        },
        {
          selector:
            'TemplateLiteral[value.raw=/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu]',
          message: '❌ Không được dùng tiếng Việt.',
        },
      ],

      // ❌ Cấm inline comment
      'no-inline-comments': 'error',

      // ⚠️ Warning nếu có TODO, FIXME
      'no-warning-comments': [
        'warn',
        {
          terms: ['todo', 'fixme'],
          location: 'anywhere',
        },
      ],

      // ❌ Tránh ký tự unicode bất thường
      'no-irregular-whitespace': 'error',

      // Quy tắc code style
      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      // React
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      'no-undef': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
