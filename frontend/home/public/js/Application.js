import AppFrame from "../../common/js/ApplicationFrame"
import AppSwitch from "../../common/js/AppSwitch"
import SettingsSwitch from "../../common/js/SettingsSwitch"
import party from "party-js";
import conf from "./Configuration"
import Header from "../../common/js/Header"
import Footer from "../../common/js/Footer"

class Application extends AppFrame{
  constructor() {
    super()
  }

  init() {
    // Deliberately NOT super.init(). That would also construct Userinfo, which
    // calls google.accounts.id.initialize() and therefore needs the Google
    // sign-in client loaded from accounts.google.com.
    //
    // This is the landing page. Nobody has to sign in to read it, and a school
    // should not have a request to Google fired at them before they have agreed
    // to anything. Sign-in stays in the apps that actually save work - they are
    // untouched by this.

    // The header first: AppSwitch and SettingsSwitch append themselves into .appbar,
    // so the bar has to exist before they run. The content sub-pages give an
    // i18n key for the subtitle (their text lives in the i18n files); the start
    // page has a literal "Home".
    const subtitleKey = document.body.getAttribute("data-appbar-subtitle-i18n")
    this.header = new Header(".appbarMount", {
      ...(subtitleKey ? { subtitleKey } : { subtitle: "Home" }),
      slogan: true
    })
    this.appSwitch = new AppSwitch()
    this.settingsSwitch = new SettingsSwitch()
    this.footer = new Footer()

    return new Promise( (resolve, reject) => {
      $(".launchArea .electra-button").one("mouseover", function(){party.confetti(this)})
      resolve(this)
    })
  }
}

let app = new Application()
export default app
