const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: "node",
  entry: {
    jdserver: path.join(process.cwd(), 'src/server/home.js')
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: "jdserver.js"
  },
  externals: [nodeExternals()]
};