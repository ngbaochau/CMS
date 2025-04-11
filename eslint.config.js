import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser';
import customNoComment from './plugin/no-comment.js';
import removeComments from './plugin/remove-comments.js';

const vietnameseCharRegex =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

export default [
  js.configs.recommended,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      'no-comment': {
        rules: {
          'ban-comments': customNoComment,
        },
      },
      'rm-comment': {
        rules: {
          'auto-delete': removeComments,
        }
      }
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
      'no-console': 'error',
      'no-debugger': 'error',
      'no-comment/ban-comments': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
      'rm-comment/auto-delete': ['error'],
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

      'no-inline-comments': 'error',

      'no-warning-comments': [
        'warn',
        {
          terms: ['todo', 'fixme'],
          location: 'anywhere',
        },
      ],

      'no-irregular-whitespace': 'error',

      quotes: ['error', 'single'],
      semi: ['error', 'always'],

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
