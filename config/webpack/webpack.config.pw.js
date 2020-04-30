const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'src', 'pistolwhip', 'src', 'pwIndex.js')
  ],
  target: 'web',
  output: {
    path: path.join(process.cwd(), 'devserver'),
    publicPath: '/', 
    filename: 'bundle.js'
  },
  devServer: {
    port: 8000,
    host: 'localhost',
    disableHostCheck: true,
    historyApiFallback: {
      index: 'pistolwhip.html'
    },
    noInfo: false,
    stats: 'minimal',
    contentBase: path.join(process.cwd(), 'src', 'pistolwhip'),
    hot: true,
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
