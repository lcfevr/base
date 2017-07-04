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

var GenerateAssetPlugin = require('generate-asset-webpack-plugin');



process.env.NODE_ENV = 'production';


function createHtml(compilation){
  return `
    
  <!DOCTYPE html>
  <html lang="zh-CN">
    <head>
        <title>App 2.0</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="./config.js?${compilation.hash}"></script>
        <script type="text/javascript" src="./vendor.bundle.${compilation.hash}.js"></script><script type="text/javascript" src="./main.${compilation.hash}.js"></script></body>

  </html>

  `


}


module.exports = merge(webpackBaseConfig, {
    entry: {
        main: './src/main',
        vendors: ['vue', 'vue-router'],
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
        // new HtmlWebpackPlugin({                                                                        // 构建html文件
        //     filename: './index_prod.html',
        //     template: path.join(__dirname, 'src/template/index.ejs'),
        //     inject: false,
        //     hash: true
        // }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendor.bundle.[hash].js'}),

        new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),

        new GenerateAssetPlugin({
            filename: './index.html',
            fn: (compilation, cb) => {
                cb(null, createHtml(compilation));
            },

        })
    ]
});



fs.open('./dist/config.js', 'w', function (err, fd) {
  var buf = `window.globalConfigs = ${JSON.stringify(resolve(config),null,4)}`;
  fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});

function resolve(obj) {
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (obj[i] && Object.prototype.toString.call(obj[i]) === '[object Object]') {
      obj[i] = resolve(obj[i]);
    } else {
      obj[i] = trim(obj[i]);
    }
  }

  return obj;
}

function trim() {
  var args = Array.prototype.slice.call(arguments);
  args = args.map(function (v) {
    try {
      return JSON.parse(v);
    } catch (e) {
      console.error(e);
      return '';
    }
  });

  console.log(args)


  switch (args.length) {
    case 0:
      return '';
    case 1:
      return args[0];
    default:
      return args;
  }
}
