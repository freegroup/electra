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

  // No socket on the home + content pages. Its only use here was syncing the
  // language choice across a user's open windows (SettingsSwitch), which is not
  // worth a persistent WebSocket on a public landing page - and that connection
  // was what made the ingress set an anonymous `connect.sid` session cookie
  // before any consent. `socket` stays declared (as null) so SettingsSwitch's guarded
  // `typeof socket` check simply skips the sync.

  // export all required classes for deserialize JSON with "eval"
  // "eval" code didn't sees imported class or code
  //
  for(var k in global) window[k]=global[k];

  i18next.use(i18nextBrowserLanguageDetector).use(Backend).init({
    fallbackLng: "en",
    // there is no de-DE.json - ask for the base language only
    load: 'languageOnly',
    ns: ['common', 'home'],
    defaultNS: 'home',
    debug: false,
    backend: {
      // absolute, so the content sub-pages (/home/imprint.html …) resolve it
      // the same way as index.html
      loadPath: '/common/i18n/{{ns}}/{{lng}}.json'
    }
  })
  .then( ()=>{
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    return axios.get("/permissions")
  })
  .then( (response) => {
    // set the global scope for the "app" object
    app = require("./Application").default
    return app.init(response.data)
  })
  .then( app => {
    $('body').localize();
    // The content sub-pages name their own title key; suffix it with the brand
    // so a browser tab / search result reads e.g. "Impressum - Electra Academy".
    // The start page has no such key and uses the full SEO page title verbatim.
    const titleKey = document.body.getAttribute("data-appbar-subtitle-i18n")
    document.title = titleKey ? `${t(titleKey)} - ${t("app.name")}` : t("app.pagetitle")
    inlineSVG.init({}, ()=>{
      $(".loader").fadeOut(500, function() { $(this).remove(); })
    })
  })
  .catch( err => {
    console.log(err)
  })
});
  