/**
 * 本地预览
 */

var path = require('path');
var fs = require('fs')
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackBaseConfig = require('./webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var config =require('./index.js');
process.env.NODE_ENV = 'development';

module.exports = merge(webpackBaseConfig, {
    // 入口
    entry: {
        main: './src/main',
        vendors: ['vue', 'vue-router']
    },
    // 输出
    output: {
        path:path.join(__dirname, './example'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [

        new webpack.DefinePlugin(merge({
            'process.env.NODE_ENV': '"development"'
        })),

        new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.bundle.js' }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: '../example/index.html',
            template: './src/template/index.ejs'
        }),
        new FriendlyErrorsPlugin()
    ]
});


fs.open('./src/config/env.js', 'w', function (err, fd) {

  var buf = `export default ${JSON.stringify(merge({'Env':process.env.NODE_ENV},config), null, 4)}`;
  fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});
