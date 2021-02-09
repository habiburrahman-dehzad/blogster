const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/auth/google', {
      target: 'http://localhost:5000',
      changeOrigin: false,
    })
  );

  app.use(
    createProxyMiddleware('/auth/*', {
      target: 'http://localhost:5000',
      changeOrigin: false,
    })
  );

  app.use(
    createProxyMiddleware('/api/*', {
      target: 'http://localhost:5000',
      changeOrigin: false,
    })
  );
};