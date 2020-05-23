const wepackMerge = require('webpack-merge');
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// const GTLoaderFilesPlugin = require('./plugins/gt-file-loader-plugin');

const ProdConfig = require('./webpack.prod.config');
const DevConfig = require('./webpack.dev.config');
const alias = require('./webpack.alias');
const dlls = require('./webpack.dll.config');

//根据条件处理相关配置
const genarateConfig = env => {
    //样式loader
    let cssLoader = [{
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    }, {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                require('postcss-cssnext')()
            ],
            sourceMap: true
        }
    }, {
        loader: 'less-loader',
        options: {
            sourceMap: true
        }
    }];
    let styleLoader = [{
        test: /\.(css|less)$/,
        use: env === 'prod' ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssLoader
        }) : [{
            loader: 'style-loader',
            options: {
                sourceMap: true
            }
        }].concat(cssLoader)
    }];

    //脚本loader
    let jsLoader = [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components|libs)/,
        use: [{
            loader: 'babel-loader'
        }].concat(env === 'dev' ? [{
            loader: 'eslint-loader'
        }] : [])
    }];

    //文件处理loader
    let fileLoaderOptions = {
        useRelativePath: false,
        name: '[name]-[hash:5].[ext]'
    };
    if (env === 'prod') {
        fileLoaderOptions.limit = 10000;
    }
    let fileLoader = [{
        test: /\.(jpg|jpeg|png|icon)$/,
        use: [{
            loader: env === 'dev' ? 'file-loader' : 'url-loader',
            options: env === 'dev' ? fileLoaderOptions : Object.assign({}, fileLoaderOptions, {
                outputPath: '../dist/img'
            })
        }]
    }, {
        //解析字体文件
        test: /\.(eot|svg|ttf|woff2?)$/,
        use: [{
            loader: env === 'dev' ? 'file-loader' : 'url-loader',
            options: env === 'dev' ? fileLoaderOptions : Object.assign({}, fileLoaderOptions, {
                outputPath: '../dist/fonts'
            })
        }]
    }
    // , {
    //     //解析主页面和页面上的图片
    //     test: /\.html$/,
    //     exclude: /(node_modules|bower_components)/,
    //     use: {
    //         loader: 'html-loader',
    //         options: {
    //             attrs: ['img:src', 'img:data-src'],
    //             minimize: true
    //         }
    //     }
    // }
];

    //webpack插件
    let plugins = [];

    //组织第三方库插件
    // for (let key in dlls.entry) {
    //     //组织DllReferencePlugin
    //     let dllPlugin = new Webpack.DllReferencePlugin({
    //         manifest: require('../dll/manifest/' + key + '.manifest.json')
    //     });
    //     plugins.push(dllPlugin);
    // }

    //加载js
    plugins.push(new AddAssetHtmlPlugin({
        filepath: Path.join(__dirname, '../dll/*.js'),
        hash: true,
        includeSourcemap: false,
        publicPath: './dll/',
        outputPath: '../dist/dll/'
    }));

    //加载css
    plugins.push(new AddAssetHtmlPlugin({
        filepath: Path.join(__dirname, '../dll/*.css'),
        hash: true,
        typeOfAsset: 'css',
        includeSourcemap: false,
        publicPath: './dll/',
        outputPath: '../dist/dll/'
    }));

    //入口html插件
    plugins.push(new HtmlWebpackPlugin({
        template: Path.join(__dirname, '../src/index.html'),
        filename: 'index.html',
        inject: true,
        chunks: ['vendor', 'example']
    }));

    //拷贝文件
    // plugins.push(new CopyWebpackPlugin([{
    //     // 第三方的字体文件
    //     from: './dll/fonts',
    //     to: '../dist/fonts'
    // }, {
    //     //表单页面文件
    //     from: './src/form/core/views',
    //     to: '../dist/core-views'
    // }, {
    //     //表单页面文件
    //     from: './src/form/office/views',
    //     to: '../dist/office-views'
    // }], {
    //     ignore: ['**/.svn/**']
    // }));

    //友好提示插件
    plugins.push(new FriendlyErrorsPlugin());

    //不打包默认加载项
    plugins.push(new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    //将加载项写入loader.js中
    // plugins.push(new GTLoaderFilesPlugin());

    let config = {
        devtool: 'source-map',
        output: {
            path: Path.join(__dirname, '../dist/'),
            filename: env === 'dev' ? '[name]-[hash:5].bundle.js' : '[name]-[chunkhash:5].bundle.js'
        },
        module: {
            rules: [].concat(styleLoader).concat(jsLoader).concat(fileLoader)
        },
        plugins: plugins,
        resolve: {
            alias: alias
        }
    };

    return config;
};

module.exports = env => {
    let config = env === 'dev' ? DevConfig : ProdConfig;
    let result = wepackMerge(genarateConfig(env), config);
    return result;
};