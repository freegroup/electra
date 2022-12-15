import axios from "axios"
import "../less/index.less"
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import UpdateSuccessDialog from "./dialog/UpdateSuccessDialog"
import Split from 'split.js'

require('js-treeview/dist/treeview.min.css')

//require('webpack-jquery-ui/css');  //ommit, if you don't want to load basic css theme

// Resolve name collision between jQuery UI and Twitter Bootstrap
/*** Handle jQuery plugin naming conflict between jQuery UI and Bootstrap ***/
$.widget.bridge('uibutton', $.ui.button)
$.widget.bridge('uitooltip', $.ui.tooltip)


// required to be compatible with jquery.layout and jquery.handsontable
//
jQuery.uaMatch = function (ua) {
  ua = ua.toLowerCase()
  var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
    /(msie) ([\w.]+)/.exec(ua) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
    []
  return {
    browser: match[1] || "",
    version: match[2] || "0"
  }
}
if (!jQuery.browser) {
  let matched = jQuery.uaMatch(navigator.userAgent)
  let browser = {}
  if (matched.browser) {
    browser[matched.browser] = true
    browser.version = matched.version
  }
  if (browser.chrome) {
    browser.webkit = true
  } else if (browser.webkit) {
    browser.safari = true
  }
  jQuery.browser = browser
}


import conf from './Configuration'


$(window).load(function () {
  document.title = conf.appName

  socket = io( { path: '/socket.io'})

  socket.on("shape:updated", () => {
    new UpdateSuccessDialog().show()
  })
  

  // Init the UI after we have receive the UI/UX permissions of this kind of installation
  // (fake event from the socket.io mock )
  //
  axios.get("../permissions").then( (response) => {
    let permissions = response.data

    // export all required classes for deserialize JSON with "eval"
    // "eval" code didn't sees imported class or code
    //
    let global = require("./global")
    for (let k in global.default) window[k] = global.default[k]
    var s = document.createElement("script")
    s.setAttribute("src",conf.shapes.jsUrl)
    s.onload = function(){
      // export all required classes for deserialize JSON with "eval".
      // "eval" code didn't sees imported class or code
      //
      app = require("./Application").default
      app.init(permissions)
      require("./hardware").default.init(socket)
      inlineSVG.init()
      $(".loader").fadeOut(500, function() { $(this).remove(); })
    }
    document.head.appendChild(s);
  });


  Split(['#paletteHeader', '#paletteElementsScroll'], {
    gutterSize: 10,
    sizes: [40, 60],
    minSize: 200,
    cursor: 'row-resize',
    direction: 'vertical'
  })
});
