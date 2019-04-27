const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname,
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: {
    home: path.join(__dirname, 'src/public/scripts/homeScript.js'),
    survive: path.join(__dirname, 'src/public/survive/surviveIndex.js'),
    gamesuite: path.join(__dirname, 'src/public/scripts/gamesuiteScript.js')
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]Bundle.js'
  },
  devServer: {
    port: 8000,
    host: 'localhost',
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/html/404.html'
        }
      ]
    },
    noInfo: false,
    stats: 'minimal',
    contentBase: 'src/public/survive/surviveIndex.js',
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