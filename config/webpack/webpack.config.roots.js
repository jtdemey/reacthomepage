const webpack = require('webpack');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindCss = require('tailwindcss');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, '..', '..', 'src/roots/rootsIndex.js')],
  target: 'web',
  output: {
    path: path.join(__dirname, '..', '..', 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    port: 8000,
    host: 'localhost',
    historyApiFallback: {
      index: 'roots.html'
    },
    disableHostCheck: true,
    noInfo: false,
    stats: 'minimal',
    contentBase: path.join(__dirname, '..', '..', 'src/roots'),
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
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                postcssPresetEnv,
                tailwindCss
              ]
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
