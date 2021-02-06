const path = require("path");

module.exports = {
  mode: "production",  
  entry: "./src/jshotkey.js",
  output: {
    filename: "jshotkey.min.js",
    path: path.resolve(__dirname + "/dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './.babelrc'
          }
        }
      }
    ]
  }
};