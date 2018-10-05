const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SERVER_ADDR = 'http://localhost:5260/';

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    home: path.join(__dirname, 'src/public/scripts/homeScript.js'),
    survive: path.join(__dirname, 'src/public/scripts/survive.js'),
    gamesuite: path.join(__dirname, 'src/public/scripts/gamesuiteScript.js')
  },
  target: 'web',
  output: {
    path: __dirname + '/dist',
    publicPath: SERVER_ADDR,
    filename: '[name]Bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJsPlugin()
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