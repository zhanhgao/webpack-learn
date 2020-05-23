const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ZipPlugin = require('zip-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
// const SvnInfo = require('svn-info').sync('https://218.106.122.66/svn/framework/trunk/gt-ui', 'HEAD');

const Path = require('path');
const pkg = require('../package.json');

module.exports = {
    entry: {
        frame0: 'frame',
        frame2: 'frame2',
        frame3: 'frame3',
        center1: 'center1',
        center2: 'center2',
        center3: 'center3',
        login1: 'login1',
        login2: 'login2',
        form: 'form',
        example: './../src/index.js'
    },
    plugins: [
        //模块分析页面
        // new BundleAnalyzerPlugin(),  webpack4CommonsChunkPlugin改成splitChunks
        // new Webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor'],
        //     minChunks: 2
        // }),
        //混淆代码
        new UglifyJsPlugin({
            sourceMap: true,
            //多线程处理
            parallel: true,
            //使用缓存
            cache: true
        }),
        //提取css文件
        new ExtractTextPlugin({
            filename: '[name]-[hash:5].css'
        }),
        // 这个怎么改？？？
        // new CleanWebpackPlugin(['dist', 'package'], {
        //     root: Path.join(__dirname, '../')
        // }),
        new CleanWebpackPlugin(),
        new Webpack.NamedChunksPlugin(),
        new Webpack.NamedModulesPlugin(),
        //版本信息
        // new Webpack.BannerPlugin({
        //     banner: `Name: ${pkg.name}\nSVNVersion: ${SvnInfo.revision}\nDate: ${new Date().toISOString().slice(0, 10)}\nDescription: ${pkg.description}`,
        //     raw: false,
        //     entryOnly: true,
        //     include: /\.js/g
        // }),
        //分析结果
        new StatsPlugin('../stats.json', {
            chunkModules: true,
            exclude: [/node_modules/]
        }),
        //复制文档页面？？？？？？？这个是什么鬼
        // new CopyWebpackPlugin([{
        //     // 第三方的字体文件
        //     from: './examples',
        //     to: '../dist/examples'
        // }, {
        //     //表单页面文件
        //     from: './docs',
        //     to: '../dist/docs'
        // }], {
        //     ignore: ['**/.svn/**']
        // }),
        //打包生成包的主页
        new HtmlWebpackPlugin({
            template: Path.join(__dirname, '../src/index.html'),
            filename: '../index.html',
            inject: true
        }),
        //压缩文件夹
        new ZipPlugin({
            filename: 'gt-ui.zip',
            path: '../package/',
            pathPrefix: 'dist'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    names: ['vendor'],
                    minChunks: 2
                }
            }
        }
    },
    profile: true
};