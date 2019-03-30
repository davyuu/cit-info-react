const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const env = process.env.NODE_ENV
const pathToEnv = env === 'prod' ? './.env.prod' : './.env.dev'

module.exports = {
  resolve: {
    extensions: [
      '.jsx',
      '.js',
      '.css'
    ]
  },
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    contentBase: './public',
    compress: true,
    disableHostCheck: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      },
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon/favicon.ico',
      template: './src/index.html',
      hash: true
    }),
    new Dotenv({
      path: pathToEnv
    })
  ]
}
