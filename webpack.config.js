const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: './src/main.js',

  output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.[contenthash].js',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'build', globOptions: { ignore: ['**/index.html'] } },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin()
  ]
};
