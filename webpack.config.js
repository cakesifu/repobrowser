const {resolve} = require('path');
const webpack = require('webpack');


module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"]
  },
  context: resolve(__dirname, 'src'),
  devtool: 'inline-source-map',
  devServer: {
    hot: false,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules']
    }]
  },

  plugins: [
    new webpack.NamedModulesPlugin()
  ]
}
