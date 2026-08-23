const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectDir = path.resolve(__dirname)
const contentDir = projectDir+"/public"

// The LESS is written to a real stylesheet instead of being injected at runtime
// by style-loader. Two reasons:
//   - the static content pages (public/de, public/en) must render their text
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
        // Nur fuer SVG, die aus JavaScript importiert werden - dort ist der
        // Sinn, das Markup inline zu bekommen (inlineSVG faerbt es spaeter ein).
        // Ohne diese Einschraenkung greift der Loader auch auf ein url() im
        // LESS zu und legt eine Datei mit .svg-Endung ab, in der
        // `module.exports = "<svg…>"` steht. Kein Browser zeichnet das.
        test: /\.svg$/,
        issuer: /\.jsx?$/,
        loader: 'svg-inline-loader'
      },
      {
        // SVG, die aus dem LESS kommen, sollen eine ausgelieferte Datei werden.
        // Eigene Regel statt die untenstehende zu erweitern: dort haengen auch
        // Schriften und PNG dran, und die beiden Schalter hier braucht nur
        // dieser Fall.
        //   type: javascript/auto  - sonst behandelt webpack 5 das Ergebnis von
        //     file-loader noch einmal als Asset und legt den Modul-Wrapper als
        //     zweite .svg ab, in der `export default "…"` steht
        //   esModule: false        - sonst bekommt publicPath ein Modulobjekt
        //     statt des Dateinamens, und im CSS steht url("/[object Module]")
        test: /\.svg$/,
        issuer: /\.less$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          esModule: false,
          // Kein publicPath: die Datei landet neben bundle.css, ein blosser
          // Dateiname loest von dort korrekt auf - egal unter welchem Praefix
          // der Dienst haengt.
        },
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