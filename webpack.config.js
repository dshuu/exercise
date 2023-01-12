const path = require('path')
const resolve = (k) => path.resolve(__dirname, k)
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: resolve('./src/index.js'),
  output: {
    path: resolve('dist'),
    filename: 'first-bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    hot: true,
    compress: true,
    port: 8080,
  },
}
