var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var config = require('./webpack.hddev.conf');
config.entry.index.unshift("webpack-dev-server/client?http://127.0.0.1:9006/", "webpack/hot/dev-server");
// config.entry.discovery.unshift("webpack-dev-server/client?http://localhost:9000/", "webpack/hot/dev-server");
var compiler = webpack(config)
var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options

  contentBase: "/",
  // or: contentBase: "http://localhost/",

  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    "/static/css/*": "http://127.0.0.1:9696",
    "/static/js/*": "http://127.0.0.1:9696",
    "/static/hd/*": "http://127.0.0.1:9696",
    "/mock/*": "http://127.0.0.1:9696"
  },

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  },
});
server.listen(9006, "0.0.0.0", function() {});
