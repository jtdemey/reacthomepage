const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'production',
  entry: {
    home: [   path.resolve(__dirname, '../src/public/scripts/homeScript'),
              'webpack-hot-middleware/client?reload=true' ],
    survive: [  path.resolve(__dirname, '../src/public/scripts/survive'),
                'webpack-hot-middleware/client?reload=true' ],
    gamesuite: [  path.resolve(__dirname, '../src/public/scripts/gamesuiteScript'),
                  'webpack-hot-middleware/client?reload=true' ]
  },
  target: 'web',
  output: {
    path: __dirname + '../dist',
    publicPath: '../',
    filename: '[name]Bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src/server/home')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'eslint-loader'
      },
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};