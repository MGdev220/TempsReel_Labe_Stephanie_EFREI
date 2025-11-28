module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/shader-projet/' : '/',
  chainWebpack: config => {
    config.module
      .rule('glsl')
      .test(/\.(glsl|vs|fs)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
