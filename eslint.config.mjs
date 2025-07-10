import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const config = [
	// Next.js and TypeScript recommended rules
	...compat.extends('next/core-web-vitals', 'next', 'next/typescript'),

	// Optional: Add React recommended rules
	// ...compat.extends('plugin:react/recommended'),

	// Optional: Add TypeScript recommended rules
	...compat.extends('plugin:@typescript-eslint/recommended'),

	// Optional: Add Prettier for formatting (if you use Prettier)
	// ...compat.extends('prettier'),

	// You can add custom rules here
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			// Example: turn off prop-types for TS files
			'react/prop-types': 'off',
		},
	},
];
export default config;