const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SERVER_ADDR = 'http://localhost:5261/';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, './src/public/survive/surviveIndex.js')],
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    port: 8000,
    host: 'localhost',
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/html/404.html' }
      ]
    },
    noInfo: false,
    stats: 'minimal',
    contentBase: path.join(__dirname, './src/public/survive'),
    hot: true,
    inline: true,
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};