import Userinfo from "../../common/js/Userinfo"
import AppSwitch from "../../common/js/AppSwitch";
import LngSwitch from "../../common/js/LngSwitch"
import party from "party-js";

class Application {
  constructor() {
  }

  init(permissions) {
    return new Promise( (resolve, reject) => {
      this.userinfo = new Userinfo(permissions)
      this.appSwitch = new AppSwitch(permissions)
      this.lngSwitch = new LngSwitch(permissions)
  
      $(".launchArea .electra-button").one("mouseover", function(){party.confetti(this)})
      resolve(this)
    })
  }
}

let app = new Application()
export default app
