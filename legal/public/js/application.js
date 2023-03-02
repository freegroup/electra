import Userinfo from "../../common/js/Userinfo"
import AppSwitch from "../../common/js/AppSwitch";
import LngSwitch from "../../common/js/LngSwitch"
import AuthorPage from "../../common/js/AuthorPage"



class Application {
  constructor() {
  }

  init(permissions) {
    this.permissions = permissions

    this.userinfo = new Userinfo(permissions)
    this.appSwitch = new AppSwitch(permissions)
    this.termsView = new AuthorPage("#markdownContainer", "readme/en/legal/terms.sheet")
    this.privacyView = new AuthorPage("#markdownContainer", "readme/en/legal/privacy.sheet")
    this.lngSwitch = new LngSwitch(permissions)

    this.termsView.render()

    $("#show-terms").on("click", this.termsView.render.bind(this.termsView))
    $("#show-privacy").on("click", this.privacyView.render.bind(this.privacyView))

  }
}

let app = new Application()
export default app
