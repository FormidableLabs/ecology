/*globals __dirname:false */
"use strict";

module.exports = {

  devServer: {
    contentBase: __dirname,
    noInfo: false
  },

  output: {
    path: __dirname,
    filename: "main.js",
    publicPath: "/"
  },

  cache: true,
  devtool: "source-map",
  entry: {
    app: ["./demo/docs.jsx"]
  },
  stats: {
    colors: true,
    reasons: true
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
      }, {
        test: /\.(css|styl)$/,
        loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader"
      }, {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};
