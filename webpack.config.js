"use strict";

var webpack = require("webpack");
var path = require("path");

module.exports = {
  cache: true,
  entry: path.join(__dirname, "src/index.js"),
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "ecology.min.js",
    library: "Ecology",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-0"]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.SourceMapDevToolPlugin("[file].map")
  ]
};
