import ApplicationFrame from "../../common/js/ApplicationFrame"
import AppSwitch from "../../common/js/AppSwitch"
import SettingsSwitch from "../../common/js/SettingsSwitch"
import Header from "../../common/js/Header"
import Footer from "../../common/js/Footer"

// The public worksheet gallery - frame only.
//
// The folder tree and the worksheet content are rendered on the server (SEO:
// every sheet is in the served HTML). This client just draws the shared chrome
// around it - header, app waffle, settings, footer - and hands navigation to
// js/nav.js, which swaps the content pane in place without a full reload.
//
// No sign-in and no session here: reading needs no login, the same reasoning as
// the start page (home/js/Application.js).
class Application extends ApplicationFrame {

  init() {
    // Deliberately NOT super.init(): that constructs Userinfo, which pulls in
    // the Google sign-in client. This is a public page - the same reasoning as
    // the start page. The bar has to exist before AppSwitch/SettingsSwitch
    // append themselves into it.
    this.header = new Header(".appbarMount", {
      subtitleKey: "gallery:subtitle",
      slogan: true,
    })
    this.appSwitch = new AppSwitch()
    this.settingsSwitch = new SettingsSwitch()
    this.footer = new Footer()

    return Promise.resolve(this)
  }
}

let app = new Application()
export default app
