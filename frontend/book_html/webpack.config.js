const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectDir = path.resolve(__dirname)
const contentDir = projectDir+"/public"

// The LESS is written to a real stylesheet instead of being injected at runtime
// by style-loader. Two reasons:
//   - the static content pages (public/book/*.html) must render their text
//     and layout even if the bundle is blocked or fails, so their styling may
//     not depend on JavaScript. They link this file.
//   - index.html gets its CSS via <link> too, so there is no flash of unstyled
//     content while the bundle is still parsing.
// LESS is still compiled at build time; nothing is compiled in the browser.
module.exports = {
  // One entry for every page of this app. The static content pages load the
  // very same bundle as the start page, so there is no second code path that
  // could drift away from it.
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
          // writes the compiled CSS to js/webpack/bundle.css instead of
          // injecting it through JavaScript
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
    // Only the bundle entry imports LESS, so this emits bundle.css alone. Both
    // the start page and the static content pages link that same file.
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
};