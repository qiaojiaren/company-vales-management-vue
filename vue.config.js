const { defineConfig } = require('@vue/cli-service')
module.exports = {
  // defineConfig: {
  //   transpileDependencies: true
  // },
  devServer: {
    https: false,
    //hotOnly: false,
    client: {
      overlay: false,//关闭全局错误提示
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // 8版本用prependData:
        additionalData:    
        `
          @import "@/styles/variables.scss";  // scss文件地址
          @import "@/styles/mixin.scss";     // scss文件地址
        `
      }
    }
  }
}
