"use strict";

module.exports = {
  entry: "./src/pusher-platform.ts",
  output: {
    filename: "target/pusher-platform.js",
    libraryTarget: "umd",
    library: "PusherPlatform"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
};