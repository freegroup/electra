import "font-awesome/css/font-awesome.css"
import "../less/index-page.less"
const axios = require("axios")
const md = require('markdown-it')()

md.use(require("markdown-it-asciimath"))
md.use(require('markdown-it-container'), "info")

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


function renderMarkdown(container, section){
  let markdown = md.render(section.content)
  container.append(`<div class="markdownRendering">${markdown}</div>`)
}

function renderBrain(container, section){
  container.append(`<div class="imageRendering"><img src="${section.content.image}"></div>` )
}
function renderImage(container, section){
  container.append(`<div class="imageRendering"><img src="${section.content}"></div>` )
}


$(window).load(function () {
  let containerId = "#authorContent"
  let sha = getParam("sha")
  let url = `../sheets/shared/get?sha=${sha}`

  axios.get(url)
    .then((response => {
      $(containerId).html("")
      let pages = response.data.pages
      pages.forEach( (page, index) => {
        let container = $("<div class='authorPage'></div>")
        $(containerId).append(container)
        let sections = page.sections
        sections.forEach( (section) => {
          switch(section.type){
            case "brain":
              renderBrain(container, section)
              break
            case "markdown":
              renderMarkdown(container, section)
              break
            case "image":
              renderImage(container, section)
              break
            default:
              break
          }
        })
        if(index < (pages.length-1))
          container.append("<div style='page-break-before:always;'></div>")
      })
    }))

  setTimeout(()=>{
    mathMLdone = true
  },2000)
})
