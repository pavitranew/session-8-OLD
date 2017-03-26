const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './app.js'
  },
  output: {
    filename: 'static/js/bundle.js'
  }
}
