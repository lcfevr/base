/**
 * 公共配置
 */

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');


module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                        less: 'vue-style-loader!css-loader!less-loader'
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    },
                    // options: {
                    //     extractCSS: false
                    // }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader', exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:[
                  'style-loader',
                    'css-loader',
                    'autoprefixer-loader'
                ]

            },
            {
                test: /\.less$/,

                    use:[
                      'style-loader',
                        'css-loader',
                        'less-loader'
                    ]

            },
            {
                test: /\.scss$/,

                use:[
                  'style-loader',
                    'css-loader',
                    'sass-loader'
                ]

            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader:'file-loader',
                        query: {limit: 8192,name: 'font/[name].[hash].[ext]'}
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
            'asset':path.join(__dirname, 'src', 'asset'),
            'vue': 'vue/dist/vue.esm.js',
        }
    },
};
