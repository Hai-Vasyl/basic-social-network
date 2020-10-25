const path = require("path")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const nodeExternals = require("webpack-node-externals")

const config = {
  target: "node",
  mode: "development",
  entry: "./server/index.ts",
  devtool: "inline-source-map",
  externals: [nodeExternals()],
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist", "server"),
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   typescript: {
    //     configFile: "tsconfig.base.json",
    //   },
    // }),
    new CleanWebpackPlugin(),
  ],
}

module.exports = config
