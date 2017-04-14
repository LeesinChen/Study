/*jslint
  white:true, for:true
  es6, maxerr: 10, node
*/

var path = require('path');
var webpack = require('webpack'),
    config = require('./webpack.hdbase.conf'),
    InlineResource = require('inline-resource-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    // CopyWebpackPlugin = require('copy-webpack-plugin'),
    // TransferWebpackPlugin = require('transfer-webpack-plugin'),
    StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

var libDir = path.resolve(__dirname, '../src/lib/');

const debug = process.env.NODE_ENV !== 'production';

// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var dashboard = new Dashboard();

// var SvgStore = require('webpack-svgstore-plugin')


// add hot-reload related code to entry chunks
// var polyfill = 'eventsource-polyfill';
// var hotClient = 'webpack-hot-middleware/client?noInfo=true&reload=true';
// Object.keys(config.entry).forEach(function (name, i) {
//   'use strict';
//   var extras = i === 0 ? [polyfill, hotClient] : [hotClient];
//   config.entry[name] = extras.concat(config.entry[name]);
// });

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/';

config.output.filename = 'static/hd/js/coolpad/[name].js?[hash]'

config.plugins = (config.plugins || []).concat([
  // new webpack.ProvidePlugin({ //加载jq
  //   $: 'jQuery'
  // }),
  //把指定文件夹下的文件复制到指定的目录
  // new TransferWebpackPlugin([
  //   {from: '../../../frontend_team/src/vendor'}
  // ], path.resolve(__dirname, "../../frontend_dist/static/js/")),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  // new InlineResource({
  //   compress: false,
  //   rootpath: './src',
  //   //if you have only one html file,this list option can also be a character string.such as
  //   //list: './src/hello.html'
  //   //it can also be a file path string or file path array.such as
  //   //list: ['./src/hello.html']
  //   //or use glob,such as
  //   //list: ['./src/*.html']
  //   include: /\.html$/i
  // }),
  new ExtractTextPlugin('static/hd/css/coolpad/[name].css?[hash]') //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    // debug ? function() {} : new UglifyJsPlugin({ //压缩代码
    // new UglifyJsPlugin({ //压缩代码
    //     compress: {
    //         warnings: false
    //     },
    //     except: ['$super', '$', 'exports', 'require'] //排除关键字
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'list.htm',
    //   template: path.resolve(__dirname, '../src/page/user/order/list.htm'),
    //   // chunks: ['order'],
    //   cache: false,
    //   inject: true
    // }),
    // new webpack.HotModuleReplacementPlugin() //热加载
    // devServer: {
    //   publicPath:'http://localhost:9090/static/',
    //   proxy: {
    //     "*": "http://localhost:54999"
    //   },
    //   inline: true,
    //   hot: true
    // }
]);

var pageNames = Object.keys(config.entry);
Array.from(pageNames).map((page) => {
  filename = config.entry[page] + '.html';
  pageName = 'templates/hd/' + path.basename(path.dirname(filename)) + '/' + page + '.html';
  var htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: pageName,
    template: path.resolve(__dirname, '.' + filename),
    chunks: [page],
    cache: false,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  });
  config.plugins.push(htmlWebpackPlugin);
});

var inlineResourcePlugin = new InlineResource({
    compress: true,
    rootpath: './src/page',
    //if you have only one html file,this list option can also be a character string.such as
    //list: './src/hello.html'
    //it can also be a file path string or file path array.such as
    //list: ['./src/hello.html']
    //or use glob,such as
    //list: ['./src/*.html']
    include: /\.html$/i
  });

config.plugins.push(inlineResourcePlugin);

// config.plugins.push(
//   new TransferWebpackPlugin([
//     {from: '../../../frontend_team/src/vendor'}
//   ], path.join(__dirname, "../../frontend_dist/static/js/"))
// );
// eval-source-map is faster for development, conflict with StyleExtHtmlWebpackPlugin
// config.devtool = 'cheap-source-map';

module.exports = config;
