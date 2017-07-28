/**
 * 生产环境
 */
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackBaseConfig = require('./webpack.base.config.js');
var fs = require('fs');
var utils = require('./utils')



process.env.NODE_ENV = '"production"';



module.exports = merge(webpackBaseConfig, {
  entry: {
    main: './src/main',
    vendors: ['vue', 'vue-router'],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'chunk/[name].[hash].chunk.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV,
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: path.join(__dirname,'../','src/template/index.ejs'),
        inject: false,
        hash: false
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'js/vendor.bundle.[hash].js'}),

    // new ExtractTextPlugin({filename: 'css/[name].css',  allChunks: true}),

    function () {
      this.plugin("done", function (stats) {
          var buildConfig = path.join(__dirname,'../dist/js/config.'+stats.hash+'.js')
          fs.open(buildConfig, 'w', function (err, fd) {
            var buf = `window.globalConfigs = ${JSON.stringify(utils.resolve(require('./config')), null, 4)}`;
            console.log(buf)
              fs.writeSync(fd, buf, 0, buf.length, 0);
            utils.after('./dist',stats.compilation.assets,stats.hash)
          });
      })
    }
  ]
});



