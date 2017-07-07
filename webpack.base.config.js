/**
 * 公共配置
 */

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    // 加载器
    module: {
        // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
        rules: [
            {
                // https://vue-loader.vuejs.org/en/configurations/extract-css.html
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({use:'css-loader',fallback:'vue-style-loader'}),
                        less: ExtractTextPlugin.extract({use:'css-loader!less-loader',fallback:'vue-style-loader'})
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    },
                    options: {
                        extractCSS: true
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader', exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        'css-loader',
                        'autoprefixer-loader'
                    ]
                })
            },
            {
                test: /\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        'css-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader:'file-loader',
                        query: {
                            limit: 8192,
                            name: 'font/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            { test: /\.(gif|jpg|png)\??.*$/, use: [{loader:'url-loader',query:{limit:8192,name:'img/[name].[hash].[ext]'}}]},
            { test: /\.(html|tpl)$/, loader: 'html-loader' },

        ]
    },

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            './asset':path.join(__dirname, 'src', 'asset'),
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
};
