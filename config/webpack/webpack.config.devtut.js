const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'src', 'webdevtut', 'tutScript.js'),
    path.join(process.cwd(), 'src', 'webdevtut', 'tut.css')
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
      index: 'tut.html'
    },
    noInfo: false,
    stats: 'minimal',
    contentBase: path.join(process.cwd(), 'src', 'webdevtut'),
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
        use: 
        [
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
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer')
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
