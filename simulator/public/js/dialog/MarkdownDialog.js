import fs from "path-browserify"

import mdFactory from "../../../common/js/markdown"
let md = mdFactory()

import conf from "../Configuration"

class Dialog {

  constructor() {
  }

  show(figure) {
    let scope = figure.attr("userData.scope")

    let shapeName = figure.attr("userData.file")
    let displayName = figure.attr("userData.displayName") ?? fs.basename(shapeName,".shape")
    let markdownName = shapeName.replace(/\.shape$/, ".md")
    let contentUrl = conf.shapes[scope].file(markdownName)
    $.get(contentUrl,  (content) => {
      $('#markdownDialog .sectionContent').html(md.render(content))
      $('#markdownDialog .media-heading').html(displayName)
      $('#markdownDialog').modal('show')
    })
  }
}

let dialog = new Dialog()
export default dialog
