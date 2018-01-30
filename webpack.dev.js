const merge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
    proxy: [{
      context: ['/auth', '/api'],
      target: 'http://localhost:3000',
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
