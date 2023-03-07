import axios from "axios"
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import jqueryI18next from "jquery-i18next"
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector"

import "../../common/js/polyfill"
import loadScript from "../../common/js/loadScript"
import "../less/index.less"
import Split from 'split.js'

require('js-treeview/dist/treeview.min.css')

// Resolve name collision between jQuery UI and Twitter Bootstrap
/*** Handle jQuery plugin naming conflict between jQuery UI and Bootstrap ***/
$.widget.bridge('uibutton', $.ui.button)

// required to be compatible with jquery.ui
//
jQuery.uaMatch = function (ua) {
  ua = ua.toLowerCase()
  var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
    /(msie) ([\w.]+)/.exec(ua) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
    []
  return {
    browser: match[1] || "",
    version: match[2] || "0"
  }
}
if (!jQuery.browser) {
  let matched = jQuery.uaMatch(navigator.userAgent)
  let browser = {}
  if (matched.browser) {
    browser[matched.browser] = true
    browser.version = matched.version
  }
// Chrome is Webkit, but Webkit is also Safari.
  if (browser.chrome) {
    browser.webkit = true
  } else if (browser.webkit) {
    browser.safari = true
  }
  jQuery.browser = browser
}


$(window).load(function () {

  socket = io( { path: '/socket.io'})

  i18next.use(i18nextBrowserLanguageDetector).use(Backend).init({
    fallbackLng: "en",
    ns: ['common', 'simulator'],
    defaultNS: 'simulator',
    debug: false,
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '../common/i18n/{{ns}}/{{lng}}.json'
    }
  })
  .then( () => {
    let global = require("./global").default
    let conf = require("./Configuration").default
    // export all required classes for deserialize JSON with "eval" (required for draw2d object loading)
    for (let k in global) window[k] = global[k]
    return loadScript(conf.shapes.jsUrl)
  })
  .then( ()=>{
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    return axios.get("../permissions")
  })
  .then( (response)=>{
    // set the global scope for the "app" object
    app = require("./Application").default
    return app.init(response.data)
  })
  .then( (app)=>{
    require("./hardware").default.init(socket)
    $('body').localize(); 
    document.title = t("app.name")
    inlineSVG.init({}, ()=>{
      $(".loader").fadeOut(500, function() { $(this).remove(); })
    })
  })
  .catch( error =>{
    console.log(error)
  })


  Split(['#paletteHeader', '#paletteElementsScroll'], {
    gutterSize: 10,
    sizes: [40, 60],
    minSize: 200,
    cursor: 'row-resize',
    direction: 'vertical'
  })
});
