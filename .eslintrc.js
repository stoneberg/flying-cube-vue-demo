module.exports = {
	root: true,
	env: {
		browser: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
	},
	extends: ['plugin:vue/vue3-essential', 'prettier/vue', 'plugin:prettier/recommended'],
	rules: {
		'vue/no-multiple-template-root': 0,
		'comma-dangle': 'off',
		'class-methods-use-this': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'implicit-arrow-linebreak': 'off',
		'import/prefer-default-export': 'off',
		'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
	},
};
