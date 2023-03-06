import AppFrame from "../../common/js/ApplicationFrame"
import AuthorPage from "../../common/js/AuthorPage"

import conf from "./Configuration"


class Application  extends AppFrame{
  constructor() {
    super()
  }

  init(permissions) {
    super.init(permissions, conf)

    return new Promise( (resolve, reject)=>{
      this.termsView = new AuthorPage("#markdownContainer", "readme/en/legal/terms.sheet")
      this.cookieView = new AuthorPage("#markdownContainer", "readme/en/legal/cookie.sheet")
      this.privacyView = new AuthorPage("#markdownContainer", "readme/en/legal/privacy.sheet")
  
      this.termsView.render()
  
      $("#show-terms").on("click", this.termsView.render.bind(this.termsView))
      $("#show-cookie").on("click", this.privacyView.render.bind(this.cookieView))
      $("#show-privacy").on("click", this.privacyView.render.bind(this.privacyView))

      resolve(this)
    })
  }
}

let app = new Application()
export default app
