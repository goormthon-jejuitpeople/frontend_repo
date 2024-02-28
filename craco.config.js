const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@mock': path.resolve(__dirname, 'src/mock'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@icons': path.resolve(__dirname, 'src/icons'),
		},
	},
};
