import inlineSVG from "../../common/js/inlineSVG"

import axios from "axios"
import "../less/index.less"
import conf from "./configuration"




$(window).load(function () {
  document.title = conf.appName

  // Init the UI after we have receive the UI/UX permissions of this kind of installation
  // (fake event from the socket.io mock )
  //
  axios.get("../permissions").then( (response) => {
    let permissions = response.data
      app = require("./application").default
      app.init(permissions)
      inlineSVG.init()
    })
});
  