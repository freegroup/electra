import AppSwitch from "./AppSwitch"
import LngSwitch from "./LngSwitch"
import Userinfo from "./Userinfo"

export default class ApplicationFrame {

    constructor() {
        this.permissions= null
    }

    init (permissions, conf) {
        this.permissions = permissions

        this.userinfo = new Userinfo(permissions)
        this.appSwitch = new AppSwitch(permissions)
        this.lngSwitch = new LngSwitch(permissions)
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