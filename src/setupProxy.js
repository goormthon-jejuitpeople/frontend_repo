const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/v1', {
			target: 'https://api.kakaobrain.com',
			changeOrigin: true,
		}),
	);
	app.use(
		createProxyMiddleware('/data', {
			target: 'https://api.openweathermap.org',
			changeOrigin: true,
		}),
	);
};
