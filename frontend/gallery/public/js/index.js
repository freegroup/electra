import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import jqueryI18next from "jquery-i18next"
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector"

import "../../common/js/polyfill"

import "../less/index.less"
import inlineSVG from "../../common/js/inlineSVG"
import initNav from "./nav"

$(window).load(function () {

  // No socket on this public page. `socket` stays declared (as null) so
  // SettingsSwitch's guarded `typeof socket` check simply skips the sync -
  // same reasoning as the start page.

  i18next.use(i18nextBrowserLanguageDetector).use(Backend).init({
    fallbackLng: "en",
    // there is no de-DE.json - ask for the base language only
    load: 'languageOnly',
    ns: ['common', 'gallery'],
    defaultNS: 'gallery',
    debug: false,
    backend: {
      loadPath: '/common/i18n/{{ns}}/{{lng}}.json'
    }
  })
  .then( ()=>{
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    app = require("./Application").default
    return app.init()
  })
  .then( app => {
    $('body').localize();
    // The per-page <title> is already set server-side (correct for the folder
    // or worksheet shown); nav.js keeps it current on in-place navigation.
    inlineSVG.init({}, ()=>{})
    initNav()
  })
  .catch( err => {
    console.log(err)
  })
});
