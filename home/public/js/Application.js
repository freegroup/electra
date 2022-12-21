import Userinfo from "../../common/js/Userinfo"
import AppSwitch from "../../common/js/AppSwitch";

class Application {
  constructor() {
  }

  init(permissions) {
    this.userinfo = new Userinfo(permissions)
    this.appSwitch = new AppSwitch(permissions)
  }
}

let app = new Application()
export default app
