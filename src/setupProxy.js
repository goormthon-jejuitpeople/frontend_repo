const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/v1/inference/kogpt/generation',
		createProxyMiddleware({
			target: 'https://api.kakaobrain.com',
			changeOrigin: true,
			//pathRewrite: { '^/api': '/v1/inference/kogpt/generation' },
		}),
	);
};
