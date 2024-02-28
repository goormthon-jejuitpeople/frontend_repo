module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react', 'eslint-plugin-prettier'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': 'off',
		'react/function-component-definition': 'off',
		'react/jsx-props-no-spreading': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off', //typeScript에서 함수의 반환 유형을 명시적으로 지정하지 않도록 허용
		'no-undef': 'off',
		'@typescript-eslint/no-var-requires': 'off',
	},
};
