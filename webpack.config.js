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
    loaders: [
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
      {
        test: /\.js$/,
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
