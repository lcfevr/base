/**
 * Created by admin on 2017/5/16.
 */
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackBaseConfig = require('./webpack.base.config.js');
var fs = require('fs');
var config =require('./index.js');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
    entry: {
        main: './src/main',
        vendors: ['vue', 'vue-router']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            'globalConfigs':config
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({                                                                        // 构建html文件
            filename: './index_prod.html',
            template: path.join(__dirname, 'src/template/index.ejs'),
            inject: false
        }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendor.bundle.[hash].js'}),
        new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
    ]
});



