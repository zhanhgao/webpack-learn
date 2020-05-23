const Path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const alias = require('./webpack.alias');

module.exports = {
    entry: {
        ngs: ['angular', 'angular-resource', 'angular-sanitize', '@uirouter/angularjs',
            'angular-animate', 'angular-touch', 'angular-cookies'
        ],
        ngui: ['jquery', 'sweetalert', 'datetimepickerCN', 'datetimepicker', 'angular-loading-bar', 'angular-strap', 'angular-ui-grid', 'ui-select',
            'angular-ui-tour', 'angular-ui-tree', 'angular-validation', 'angular-carousel'
        ],
        base: ['babel-polyfill', 'lodash']
    },
    output: {
        path: Path.join(__dirname, '../dll'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    resolve: {
        alias: alias
    },
    plugins: [
        // new Webpack.DllPlugin({
        //     path: Path.join(__dirname, '../dll/manifest/', '[name].manifest.json'),
        //     name: '[name]'
        // }),
        // new CopyWebpackPlugin([{
        //     from: './src/libs/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css'
        // }, {
        //     from: './node_modules/angular-loading-bar/build/loading-bar.css'
        // }, {
        //     from: './node_modules/ui-select/dist/select.css'
        // }, {
        //     from: './node_modules/angular-ui-tree/dist/angular-ui-tree.min.css'
        // }, {
        //     from: './node_modules/angular-carousel/dist/angular-carousel.min.css'
        // }])
    ]
};

