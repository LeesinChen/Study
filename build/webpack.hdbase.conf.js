/*jslint
  white:true, for:true
  es6, maxerr: 10, node
*/

var hdPages = require('./hd');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var libDir = path.resolve(__dirname, '../src/lib/');

module.exports = {
  entry: hdPages,
  output: {
    path: path.resolve(__dirname, '../../frontend_hd/'),
    publicPath: '/',
    filename: 'static/js/[name].js'
  },
  externals: {   // If you load it via <script> tag
    jquery: 'jQuery'
    // FastClick: 'FastClick',
    // Swiper: 'swiper',
    // Zepto: 'Zepto'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {    // included in bundle
      src: path.resolve(__dirname, 'src'),
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  eslint: {
    configFile: ".eslintrc",
    emitWarnings: true
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
      // {
      //   test: /\.svg$/i, loader: 'inline'
      // },
      // { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
      {
        test: /\.woff$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'static/hd/css/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.ttf$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: 'static/hd/css/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: 'static/hd/css/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.eot$/,
        loader: "file-loader",
        query: {
          name: 'static/hd/css/[name].[ext]?[hash:7]'
        }
      },
      {
        // test: /\.(png|jpg|gif|svg)$/,
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 8000,
          name: 'static/hd/img/[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  sassLoader: {
    outputStyle: 'compressed',
  },
};
