// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  css: {
    extract: false,
  },
  // webpack相关
  configureWebpack: (config) => {
    config.name = '布局';
    if (process.env.NODE_ENV === 'production') {
      config.output = Object.assign(config.output, {
        libraryExport: 'default',
      });
    } else {
      // 为开发环境修改配置...
    }
  },
};
