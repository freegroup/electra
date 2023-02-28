import axios from "axios"

import Userinfo from "../../common/js/Userinfo"
import AppSwitch from "../../common/js/AppSwitch";
import LngSwitch from "../../common/js/LngSwitch"

import conf from "./configuration"
import ShapesView from "./views/shapes"
import SheetsView from "./views/sheets"

class Application {
  constructor() {
  }

  init(permissions) {
    this.permissions = permissions

    this.userinfo = new Userinfo(permissions)
    this.appSwitch = new AppSwitch(permissions)
    this.shapesView = new ShapesView(permissions)
    this.sheetsView = new SheetsView(permissions)
    this.lngSwitch = new LngSwitch(permissions)

    this.currentView = this.sheetsView

    this.currentView.init()

    $('.search-input').on("keyup", (event) => {
       this.currentView.filter($('.search-input').val())
    });

    $("#search-worksheet").on("click", ()=>{
      this.currentView = this.sheetsView
      this.currentView.init()
    })

    $("#search-components").on("click", ()=>{
      this.currentView = this.shapesView
      this.currentView.init()
    })
  }
}

let app = new Application()
export default app
