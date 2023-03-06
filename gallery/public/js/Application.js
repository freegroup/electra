import AppFrame from "../../common/js/ApplicationFrame"
import conf from "./Configuration"

import ShapesView from "./views/shapes"
import SheetsView from "./views/sheets"

class Application extends AppFrame{
  constructor() {
    super()
  }

  init(permissions) {
    super.init(permissions, conf)

    this.shapesView = new ShapesView(permissions)
    this.sheetsView = new SheetsView(permissions)

    this.currentView = this.sheetsView

    return this.currentView.init()
    .then(()=>{
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
      
      return this
    })
  }
}

let app = new Application()
export default app
