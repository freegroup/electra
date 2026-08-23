// Das Handbuch ist eine reine Lese-Anwendung.
//
// Der gesamte Text steht im HTML - die Seiten unter public/book/ sind
// fertige Dateien aus tools/convert-book.js, nichts wird zur Laufzeit gerendert.
// Dieses Bundle bestueckt nur die Leiste. Wird es blockiert oder scheitert es,
// bleibt das Buch vollstaendig lesbar; deshalb liegt das CSS auch als Datei
// vor und nicht im style-loader.
//
// Kein i18next: AppSwitch fuehrt keine Uebersetzungsschluessel, und
// SettingsSwitch ist ausdruecklich fuer den Betrieb ohne i18next gebaut (siehe
// Kopf dort). Das Buch selbst ist deutsch geschrieben - eine englische Fassung
// waere ein eigenes Vorhaben, kein Schalter.
//
// Kein Userinfo, aus demselben Grund wie auf der Startseite: das wuerde den
// Google-Anmeldeclient nachladen, und zum Lesen muss sich niemand anmelden.

import axios from "axios"

import "../../common/js/polyfill"
import "../less/index.less"

import AppSwitch from "../../common/js/AppSwitch"
import SettingsSwitch from "../../common/js/SettingsSwitch"
import inlineSVG from "../../common/js/inlineSVG"
import initToc from "./toc"
import Footer from "../../common/js/Footer"

$(document).ready(() => {
  // Zuerst, und ohne auf das Netz zu warten: die Navigation gehoert zur Seite,
  // nicht zur Leiste.
  initToc()
  new Footer()

  axios.get("/permissions")
    .then((response) => {
      new AppSwitch(response.data)
      new SettingsSwitch(response.data)
    })
    .catch((err) => {
      // Die Leiste ist Beiwerk. Faellt der Dienst aus, wird der Text trotzdem
      // gelesen - also nicht abbrechen.
      console.log(err)
    })
    .then(() => {
      inlineSVG.init({}, () => {
        $(".loader").fadeOut(500, function () { $(this).remove() })
      })
    })
})
