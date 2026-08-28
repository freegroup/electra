import "../../common/js/polyfill"

import "../less/index.less"
const axios = require("axios")
import renderMode from "./renderMode"


import editorByType from "./editor/editorByType"
import visibleIn from "./visibility"

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
  // Preferred: a short-lived render token (login-free read of one version) used
  // by the preview/PDF renderer. ?public= is a published doc. Legacy
  // ?sha=/?global= kept as fallback for old links.
  let rtoken = getParam("rtoken")
  let pub = getParam("public")
  let sha = getParam("sha")
  let global = getParam("global")
  let mode = getParam("mode") ?? renderMode.WORKSHEET

  let url
  if (rtoken) {
    // render-token read via the sheets backend (the ingress no longer exposes
    // /database). This page is loaded by puppeteer on localhost.
    url = `../sheets/render?token=${encodeURIComponent(rtoken)}`
  } else if (pub) {
    url = `../sheets/public/${pub}`
  } else if (sha) {
    url = `../sheets/shared/get?sha=${sha}`
  } else if (global) {
    url = `../sheets/global/get?filePath=${global}`
  }

  axios.get(url)
    .then((response => {
      $(containerId).html("")
      // Public read wraps the doc as { data, meta, ... }; legacy returned the
      // doc object directly. Accept both.
      let doc = response.data && response.data.data ? response.data.data : response.data
      let pages = doc.pages
      let rendered = 0
      pages.forEach( (page) => {
        // Drop cells that do not belong on this sheet. A page whose cells are
        // all hidden here would print as a blank page, so skip it entirely.
        let sections = page.sections.filter( (section) => visibleIn(section, mode) )
        if (sections.length === 0) {
          return
        }
        // Page break before every rendered page but the first, so a skipped
        // page never leaves a dangling blank page.
        if (rendered > 0) {
          $(containerId).append("<div style='page-break-before:always;'></div>")
        }
        let container = $("<div class='authorPage'></div>")
        $(containerId).append(container)
        sections.forEach( (section) => {
          let editor = editorByType(section.type)
          let content = editor.render(section, mode)
          container.append(`<div class='section' data-id="${section.id}" data-type="${section.type}"></div>`)
          let sectionNode = container.find(`*[data-id="${section.id}"]`)
          editor.append(sectionNode, content)
        })
        rendered++
      })
    }))

  setTimeout(()=>{
    mathMLdone = true
  },2000)
})
