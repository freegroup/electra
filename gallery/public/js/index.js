import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import jqueryI18next from "jquery-i18next"
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector"

import inlineSVG from "../../common/js/inlineSVG"
import "../../common/js/polyfill"

import axios from "axios"
import "../less/index.less"
import global from "./global"


$(window).load(function () {
  // set the global socket object
  socket = io( { path: '/socket.io'})

  // export all required classes for deserialize JSON with "eval"
  // "eval" code didn't sees imported class or code
  //
  for(var k in global) window[k]=global[k];

  i18next.use(i18nextBrowserLanguageDetector).use(Backend).init({
    fallbackLng: "en",
    ns: ['common', 'gallery'],
    defaultNS: 'gallery',
    debug: false,
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '../common/i18n/{{ns}}/{{lng}}.json'
    }
  })
  .then( ()=>{
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    return axios.get("../permissions")
  })
  .then( (response) => {
    // set the global scope for the "app" object
    app = require("./Application").default
    return app.init(response.data)
  })
  .then( (app) =>{    
    $('body').localize();
    document.title = t("app.name")
    inlineSVG.init({}, ()=>{
      $(".loader").fadeOut(500, function () {$(this).remove()}) 
    })
  })  
  .catch( err => {
    console.log(err)
  })
});


