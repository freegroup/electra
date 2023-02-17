import "../../common/js/polyfill"

import "../less/index-page.less"
const axios = require("axios")
import renderMode from "./renderMode"


import editorByType from "./editor/editorByType"

function getParam(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
  let regexS = "[\\?&]" + name + "=([^&#]*)"
  let regex = new RegExp(regexS)
  let results = regex.exec(window.location.href)
  // the param isn't part of the normal URL pattern...
  //
  if (results === null) {
    // maybe it is part in the hash.
    //
    regexS = "[\\#]" + name + "=([^&#]*)"
    regex = new RegExp(regexS)
    results = regex.exec(window.location.hash)
    if (results === null) {
      return null
    }
  }
  return results[1]
}

$(window).load(function () {
  let containerId = "#authorContent"
  let sha = getParam("sha")
  let global = getParam("global")
  let mode = getParam("mode") ?? renderMode.WORKSHEET

  let url = `../sheets/`
  
  if(sha){
    url = url +`shared/get?sha=${sha}`
  }
  else if(global){
    url = url +`global/get?filePath=${global}`
  }

  axios.get(url)
    .then((response => {
      $(containerId).html("")
      let pages = response.data.pages
      pages.forEach( (page, index) => {
        let container = $("<div class='authorPage'></div>")
        $(containerId).append(container)
        page.sections.forEach( (section) => {
          let content = editorByType(section.type).render(section, mode)
          container.append(`<div class='section' data-id="${section.id}" data-type="${section.type}">${content}<div class="fc"></div></div>`)
        })
        if(index < (pages.length-1))
          container.append("<div style='page-break-before:always;'></div>")
      })
    }))

  setTimeout(()=>{
    mathMLdone = true
  },2000)
})
