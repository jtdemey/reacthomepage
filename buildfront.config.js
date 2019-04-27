const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const HtmlPluginRemove = require('html-webpack-plugin-remove');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    home: path.join(process.cwd(), 'src/public/scripts/homeScript.js'),
    survive: path.join(process.cwd(), 'src/survive/surviveIndex.js')
    //gamesuite: path.join(process.cwd(), 'src/public/scripts/gamesuiteScript.js')
  },
  target: 'web',
  output: {
    path: process.cwd() + '/dist',
    publicPath: './dist',
    filename: 'scripts/[name]Bundle.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd()
    }),
    new HtmlWebpackPlugin({
      filename: 'html/home.html',
      template: './src/public/html/home.html',
      excludeAssets: [/surviveBundle.js/]
    }), 
    new HtmlWebpackPlugin({
      filename: 'html/lobby.html',
      template: './src/public/html/lobby.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'html/survive.html',
      template: './src/public/html/survive.html'
    }),
    new HtmlPluginRemove(/<\s*script[^>]*>(.*?)<\s*\/\s*script>/),
    new HtmlWebpackExcludeAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
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
      { //CSS
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
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