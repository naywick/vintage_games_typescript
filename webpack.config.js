const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: "development",
  entry: "./tetris.tsx",
  output: { filename: "js/[fullhash].js", path: __dirname + "/public" },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'], },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['index.html', 'js'],
    }),
    new HtmlWebpackPlugin({
      title: "Tetris",
      filename: 'index.html'
    }),
  ],
};

module.exports = config;
