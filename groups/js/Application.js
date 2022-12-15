import AppSwitch from "../common/js/AppSwitch"
import Userinfo from "../common/js/Userinfo"

import Palette from "./Palette"
import View from "./View"
import Toolbar from "./Toolbar"

import conf from "./Configuration"

class App {

  constructor() {
  }

  init(permissions) {
    this.palette = new Palette(this, permissions)
    this.view = new View(this, permissions)
    this.toolbar = new Toolbar(this, permissions)
    this.userinfo = new Userinfo(permissions, conf)
    this.appSwitch = new AppSwitch(permissions, conf)
  }
}

let app = new App()
export default app
