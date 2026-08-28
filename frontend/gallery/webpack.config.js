const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectDir = path.resolve(__dirname)
const contentDir = projectDir+"/public"

// The LESS is written to a real stylesheet (bundle.css) via MiniCssExtract
// instead of being injected at runtime by style-loader, so index.html links it
// as a <link> and shows no flash of unstyled content while the bundle parses.
// LESS is compiled at build time; nothing is compiled in the browser.
module.exports = {
  entry: { bundle: contentDir + '/js/index.js' },
  devtool: 'source-map',
  mode: 'development',
  output: {
    libraryTarget: 'umd', // make the bundle export
    path: contentDir + '/js/webpack',
    filename: "[name].js"
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
};
