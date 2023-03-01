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

//require('webpack-jquery-ui/css');  //ommit, if you don't want to load basic css theme

// Resolve name collision between jQuery UI and Twitter Bootstrap
/*** Handle jQuery plugin naming conflict between jQuery UI and Bootstrap ***/
$.widget.bridge('uibutton', $.ui.button)
$.widget.bridge('uitooltip', $.ui.tooltip)


// required to be compatible with jquery.layout and jquery.handsontable
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
  if (browser.chrome) {
    browser.webkit = true
  } else if (browser.webkit) {
    browser.safari = true
  }
  jQuery.browser = browser
}


import conf from './Configuration'


$(window).load(function () {
  document.title = conf.appName

  socket = io( { path: '/socket.io'})
  let permissions = null

  i18next.use(i18nextBrowserLanguageDetector).use(Backend).init({
    fallbackLng: "en",
    ns: ['common', 'simulator'],
    defaultNS: 'simulator',
    debug: true,
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '../common/i18n/{{ns}}/{{lng}}.json'
    }
  })
  .then( ()=>{
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    return axios.get("../permissions")})
  .then( (response) => {
    permissions = response.data

    // export all required classes for deserialize JSON with "eval"
    // "eval" code didn't sees imported class or code
    //
    let global = require("./global")
    for (let k in global.default) window[k] = global.default[k]
    return loadScript(conf.shapes.jsUrl)
  })
  .then( ()=>{
    app = require("./Application").default
    return app.init(permissions)
  })
  .then( ()=>{
    require("./hardware").default.init(socket)
    $('body').localize(); 
    inlineSVG.init({}, ()=>{
      $(".loader").fadeOut(500, function() { $(this).remove(); })
    })
  });


  Split(['#paletteHeader', '#paletteElementsScroll'], {
    gutterSize: 10,
    sizes: [40, 60],
    minSize: 200,
    cursor: 'row-resize',
    direction: 'vertical'
  })
});
