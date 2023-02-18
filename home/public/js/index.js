import axios from "axios"
import "../../common/js/polyfill"

import "../less/index.less"
import inlineSVG from "../../common/js/inlineSVG"


// simple text fade out for the card headers
//
function get() {
var el = $('.section_header');
el.each((index, text) => {
    text = $(text)
    var offset = text.offset().top - $(window).scrollTop();
    if (offset > 200) {
    text.css("opacity", 0)
    } else if (offset > 100) {
    text.css("opacity", (100-(offset-100)) / 100)
    } else {
    text.css("opacity",  1)
    }
})
return true
}


get();
$(window).scroll(get);

$(window).load(function () {

    // Init the UI after we have receive the UI/UX permissions of this kind of installation
    // (fake event from the socket.io mock )
    //
    axios.get("../permissions").then( (response) => {
      let permissions = response.data
        app = require("./Application").default
        app.init(permissions)
        inlineSVG.init()
      })
});
  