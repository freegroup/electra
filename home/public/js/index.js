import axios from "axios"
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import jqueryI18next from "jquery-i18next"
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector"
import global from "./global"

import "../../common/js/polyfill"

import "../less/index.less"
import inlineSVG from "../../common/js/inlineSVG"


// simple text fade out for the card headers
//
function get() {
var el = $('.section_header');
el.each((index, text) => {
    text = $(text)
    var offset = text.offset().top - $(window).scrollTop();
    if (offset > 200) {
    text.css("opacity", 0)
    } else if (offset > 100) {
    text.css("opacity", (100-(offset-100)) / 100)
    } else {
    text.css("opacity",  1)
    }
})
return true
}

get();
$(window).scroll(get);

$(window).load(function () {

  // set the global socket object
  socket = io( { path: '/socket.io'})

  // export all required classes for deserialize JSON with "eval"
  // "eval" code didn't sees imported class or code
  //
  for(var k in global) window[k]=global[k];

  i18next.use(i18nextBrowserLanguageDetector).use(Backend).init({
    fallbackLng: "en",
    ns: ['common', 'home'],
    defaultNS: 'home',
    debug: true,
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
    let permissions = response.data
    app = require("./Application").default
    return app.init(permissions)
  })
  .then( (app) => {
    $('body').localize();
    inlineSVG.init()
  })
});
  