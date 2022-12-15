const path = require('path');

const projectDir = path.resolve(__dirname)

module.exports = {
  entry: projectDir + '/js/index.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    libraryTarget: 'umd', // make the bundle export
    path: projectDir + '/js/webpack',
    filename: "bundle.js"
  },
  resolve: {
    modules: [projectDir + '/node_modules', projectDir + '/src/'],
    extensions: ['.json', '.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
};