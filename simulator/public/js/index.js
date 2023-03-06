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
  .then( ()=>{
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
