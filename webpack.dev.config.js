/**
 * 开发环境
 */

var path = require('path');
var fs = require('fs')
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackBaseConfig = require('./webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

process.env.NODE_ENV = '"development"';
module.exports = merge(webpackBaseConfig, {
    // 入口
    entry: {
        main: './src/main',
        vendors: ['vue', 'vue-router']
    },
    // 输出
    output: {
        path:path.join(__dirname, 'example'),
        publicPath: '',
        filename: 'js/[name].js',
        chunkFilename: 'chunk/[name].chunk.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV,
            'globalConfigs':require('./index.js')
        }),
        new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'js/vendor.bundle.js' }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: '../example/index.html',
            template: './src/template/index.ejs'
        }),
        new FriendlyErrorsPlugin()
    ]
});


