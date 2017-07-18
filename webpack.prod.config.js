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



process.env.NODE_ENV = '"production"';



module.exports = merge(webpackBaseConfig, {
  entry: {
    main: './src/main',
    vendors: ['vue', 'vue-router'],
  },
  output: {
    path: path.join(__dirname, './dist'),
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
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({                                                                        // 构建html文件
        filename: './index.html',
        template: path.join(__dirname, 'src/template/index.ejs'),
        inject: false,
        hash: false
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'js/vendor.bundle.[hash].js'}),

    new ExtractTextPlugin({filename: 'css/[name].css',  allChunks: true}),

    function () {
      this.plugin("done", function (stats) {
          fs.open('./dist/js/config.'+stats.hash+'.js', 'w', function (err, fd) {
            var buf = `window.globalConfigs = ${JSON.stringify(resolve(require('./index.js')), null, 4)}`;
              fs.writeSync(fd, buf, 0, buf.length, 0);
            after('./dist',stats.compilation.assets,stats.hash)
          });
      })
    }
  ]
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


  switch (args.length) {
    case 0:
      return '';
    case 1:
      return args[0];
    default:
      return args;
  }
}


function after(root,files,hash) {

    Object.keys(files)
      .forEach(function (file) {
        file = path.resolve(root, file);

          var content = fs.readFileSync(file, 'utf8');

          if (/index\.html/i.test(file)) {
            content = content
              .replace(/(js\/config\.js)/, 'js/config.'+hash+'.js');

            fs.writeFileSync(file, content);
          }

      });
}
