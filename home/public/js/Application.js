import AppFrame from "../../common/js/ApplicationFrame"
import party from "party-js";
import conf from "./Configuration"

class Application extends AppFrame{
  constructor() {
    super()
  }

  init(permissions) {
    super.init(permissions, conf)

    return new Promise( (resolve, reject) => {

      $(".launchArea .electra-button").one("mouseover", function(){party.confetti(this)})
      resolve(this)
    })
  }
}

let app = new Application()
export default app
