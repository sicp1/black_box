const { createProxyMiddleware } = require('http-proxy-middleware');
console.log("123")
module.exports = function(app) {
    app.use(
      '/api',
      proxyMiddleware(options.filter || context, options),
      createProxyMiddleware({
        target: 'http://127.0.0.1:8080', //代理的地址
        changeOrigin: true,
        secure: false,
     pathRewrite: {
         "^/api": ""
     }

      })
    )
  };
