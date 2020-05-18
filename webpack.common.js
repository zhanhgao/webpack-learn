 const path = require('path');
 const {
   CleanWebpackPlugin
 } = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js'
   },
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'Production'
     }),
     new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
   ],
   output: {
     //  filename: '[name].bundle.js',
     filename: '[name].[chunkhash].js',
     path: path.resolve(__dirname, 'dist')
   },
   module: {
     rules: [{
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(csv|tsv)$/,
         use: [
           'csv-loader'
         ]
       },
       {
         test: /\.xml$/,
         use: [
           'xml-loader'
         ]
       }
     ]
   }
 };