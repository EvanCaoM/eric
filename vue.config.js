module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    open: true,
    host: 'localhost',
    port: '8081',

    proxy: {
      '/api1': {
        target: 'http://172.20.168.57/ericapi', // 要请求的地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};