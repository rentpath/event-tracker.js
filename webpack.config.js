const path = require('path')

module.exports = {
  entry: './index',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'bundle.min.js',
    libraryTarget: 'amd',
  },
}
