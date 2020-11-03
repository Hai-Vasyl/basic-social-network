const path = require("path")
const webpack = require("webpack")
const HTMLWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const config = {
  target: "web",
  mode: "development",
  entry: "./client/src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist", "client"),
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".scss", ".tsx", ".ts"],
  },
  module: {
    rules: [
      { test: /\.(png|jpg|jpeg|gif)$/, use: ["file-loader"] },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/dist/client/",
              hmr: true,
              reloadAll: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HTMLWebPackPlugin({
      template: "./client/public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "client", "public", "favicon.ico"),
          to: path.resolve(__dirname, "dist", "client"),
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist", "client"),
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
}

module.exports = config
