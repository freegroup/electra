const path = require('path');

const projectDir = path.resolve(__dirname)
const contentDir = projectDir+"/public"

module.exports = {
  entry: contentDir + '/js/index.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    libraryTarget: 'umd', // make the bundle export
    path: contentDir + '/js/webpack',
    filename: "bundle.js"
  },
  resolve: {
    modules: [projectDir + '/node_modules', contentDir + '/src/'],
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
        test: /\.(eot|woff|ttf|woff2|png|gif)$/,
        loader: "file-loader" ,
        options: {
          publicPath: function(url) {
            return "js/webpack/"+url
          }
        }
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
            presets: ['modern-browsers']
          }
        }
      }
    ],
  },
};