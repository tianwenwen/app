require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
//定义了端口号,不仅可以从环境变量中取,也可以从 config文件下得 index.js 文件下获取 8080
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//这是从 config文件里的index 内的 dev: proxyTable 中获取需要代理的一些接口,
//根据业务需求调配,需要的话则通过 proxyTable 进行转发
var proxyTable = config.dev.proxyTable

var app = express()//启动 express获取app对象
var compiler = webpack(webpackConfig)//调用webpack方法编译,把 webpackConfig 传入 是为了给下面的中间件用得

//express专门为webpack开发的一个中间件,我们可以请求到 app.js ,
// 但是我们的文件目录中没有这个文件--(这个中间件把编译好的文件放在内存中,我们访问的就是这个内存)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

//与热加载相配合使用的一个插件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests  代理转发
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
