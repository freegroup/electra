import axios from "axios"

import Userinfo from "../../common/js/Userinfo"
import AppSwitch from "../../common/js/AppSwitch";

import conf from "./configuration"
import ShapeView from "./views/shapes"

class Application {
  constructor() {
  }

  init(permissions) {
    this.permissions = permissions

    this.userinfo = new Userinfo(permissions)
    this.appSwitch = new AppSwitch(permissions)
    this.shapeView = new ShapeView(permissions)

    $(".search-button").on("click", ()=>{
      alert("search")
    })

    // load the worksheets first
    axios.get(conf.shapes.jsonUrl)
    .then((response) => {
      let files = response.data
      this.shapeView.render(files)
      return files
    })
    .catch( exc => {
      console.log(exc)
      return []
    })
  }
}

let app = new Application()
export default app
