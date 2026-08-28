import AppSwitch from "./AppSwitch"
import SettingsSwitch from "./SettingsSwitch"
import Userinfo from "./Userinfo"
import Header from "./Header"

export default class ApplicationFrame {

    init (conf) {
        // Die Leiste zuerst - die drei Widgets darunter haengen sich in .appbar
        // ein, die muss also stehen. Slogan und Benutzermenue hat jeder Editor,
        // deshalb fest; seinen Namen holt sich Header aus data-subtitle am
        // Mount. Die Startseite geht hier nicht durch, sie baut ihre Leiste
        // selbst (kein Userinfo, siehe home/js/Application.js).
        this.header = new Header(".appbarMount", { slogan: true, userinfo: true })

        this.userinfo = new Userinfo()
        this.appSwitch = new AppSwitch()
        this.settingsSwitch = new SettingsSwitch()
    }

    getParam (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
        let regexS = "[\\?&]" + name + "=([^&#]*)"
        let regex = new RegExp(regexS)
        let results = regex.exec(window.location.href)
        // the param isn't part of the normal URL pattern...
        //
        if (results === null) {
            // maybe it is part in the hash.
            //
            regexS = "[\\#]" + name + "=([^&#]*)"
            regex = new RegExp(regexS)
            results = regex.exec(window.location.hash)
            if (results === null) {
                return null
            }
        }
        return results[1]
    }
}