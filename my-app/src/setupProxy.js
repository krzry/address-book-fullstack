const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/users',
    proxy({
      target: 'http://localhost:3003',
      changeOrigin: true,
    })
  );
};