const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './index',

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'bundle.min.js',
    libraryTarget: 'amd'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        warnings : false
      }
    })
  ]
}
