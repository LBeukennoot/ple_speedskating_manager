const path = require('path');
module.exports = {
  entry: './src/App.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
};