const path = require('path');

module.exports = {
  entry: {
    'shAccessKey': path.resolve(__dirname, 'src/shAccessKey.ts')
  },
  output: {
    filename: '[name].legacy.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'umd'
    },
    environment: {
      arrowFunction: false,
      const: false,
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.legacy.json"
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
    extensions: [".ts", ".js"],
  },
};