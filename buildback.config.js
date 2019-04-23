const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: "node",
  entry: {
    jdserver: path.join(__dirname, 'src/server/home.js')
  },
  output: {
    path: __dirname + '/dist',
    filename: "jdserver.js"
  },
  externals: [nodeExternals()],
};