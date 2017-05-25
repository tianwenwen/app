var utils = require('./utils')//代表一些工具方法
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')//合并配置文件
var baseWebpackConfig = require('./webpack.base.conf')//开发和运行的配置文件所共享的,
var HtmlWebpackPlugin = require('html-webpack-plugin')//提供操作HTML文件的一个插件
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks/热加载功能模块,代码改动,浏览器不刷新实现代码功能
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({//把源码中的 process.env 字符串替换为 config.dev.env
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),//热加载的插件
    new webpack.NoEmitOnErrorsPlugin(),//编译出错时，跳过那部分代码，使编译后运行包不会发生错误
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({//打包过程中输出的js或者css文件路径会自动添加到这个 HTML 文件里
      filename: 'index.html',
      template: 'index.html', //指定要处理的模板
      inject: true//在打包过程中路径自动添加到html文件中
    }),
    new FriendlyErrorsPlugin()
  ]
})
