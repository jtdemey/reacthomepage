const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPluginRemove = require('html-webpack-plugin-remove');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    home: path.join(process.cwd(), 'src/homepage/homeScript.js'),
    about: path.join(process.cwd(), 'src/about/aboutScript.js'),
    imposter: path.join(process.cwd(), 'src/imposter/imposterIndex.js'),
    survive: path.join(process.cwd(), 'src/survive/surviveIndex.js')
  },
  target: 'web',
  output: {
    path: path.join(process.cwd(), 'dist', 'public'),
    publicPath: '/',
    filename: '[name]Bundle.[hash:8].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['home'],
      filename: 'home.html',
      template: './src/homepage/home.html'
    }), 
    new HtmlWebpackPlugin({
      chunks: ['about'],
      filename: 'about.html',
      template: './src/about/about.html'
    }), 
    new HtmlWebpackPlugin({
      chunks: ['imposter'],
      filename: 'imposter.html',
      template: './src/imposter/imposter.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['survive'],
      filename: 'survive.html',
      template: './src/survive/survive.html'
    }),
    new HtmlPluginRemove(/<\s*script[^>]*>(.*?)<\s*\/\s*script>/)
  ],
  module: {
    rules: [
      { //BABEL
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { //HTML
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              removeComments: false,
              collapseWhitespace: false,
              outputPath: 'html'
            }
          }
        ]
      },
      { //SVG
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      { //ASSETS
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  }
};
