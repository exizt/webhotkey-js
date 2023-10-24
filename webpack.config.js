const path = require('path');

module.exports = {
  entry: {
    'WebHotKey': path.resolve(__dirname, 'src/auto.js')
  },
  experiments: {
    outputModule: true,
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module'
    }
  },
  module: {
    rules: [
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
    extensions: [".js"],
  },
};