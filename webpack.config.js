const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.tsx',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Tasker',
    }),
  ],
  devServer: {
    compress: true,
    port: 5555,
    historyApiFallback: true,
  },
  output: {
    filename: 'app.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/i,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
