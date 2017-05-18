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

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
    entry: {
        main: './src/main',
        vendors: ['vue', 'vue-router']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),

        // new webpack.LoaderOptionsPlugin({
        //     // test: /\.xxx$/, // may apply this only for some modules
        //     options: {
        //         babel: {
        //             presets: ['es2015'],
        //             plugins: ['transform-runtime']
        //         }
        //     }
        // }),

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

// 写入环境变量
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {
    });
});

