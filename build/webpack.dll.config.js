/**
 * Created by admin on 2017/12/21.
 */
var path = require('path')
var webpack = require('webpack')

var context = path.join(__dirname, '..')

module.exports = {
  entry: {
    vendor: ['vue','vue-router','axios']
  },
  output: {
    path: path.join(context, 'static/js'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [

    new webpack.DllPlugin({
      path: path.join(context, '[name].manifest.json'),
      name: '[name]',
      context: context
    }),
    // 压缩js代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: { // 删除打包后的注释
        comments: false
      }
    }),

  ]
}

