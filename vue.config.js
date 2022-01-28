module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end();
  }
};
