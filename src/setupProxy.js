const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
      '/api/',
      createProxyMiddleware({
          target : 'https://taroko-contacts-server.herokuapp.com/',
          changeOrigin : true, 
          ws: true,
          PathRewrite : {
              '^/api/' : ''
          }
      })
  );
};
