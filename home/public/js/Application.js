import Userinfo from "../../common/js/Userinfo"
import AppSwitch from "../../common/js/AppSwitch";
import party from "party-js";

class Application {
  constructor() {
  }

  init(permissions) {
    this.userinfo = new Userinfo(permissions)
    this.appSwitch = new AppSwitch(permissions)

    $(".launchArea .electra-button").one("mouseover", function(){
      party.confetti(this)
    })
  }
}

let app = new Application()
export default app
