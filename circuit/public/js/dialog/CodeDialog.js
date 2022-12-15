import "google-code-prettify/bin/prettify.min.css"

import {prettyPrint} from "google-code-prettify/bin/prettify.min"
import conf from "../Configuration";

export default class CodeDialog {

  constructor() {
  }

  show(figure) {
    let scope = figure.attr("userData.scope")
    let shapeName = figure.attr("userData.file")
    let customName = shapeName.replace(/\.shape$/, ".custom")
    let contentUrl = conf.shapes[scope].file(customName)
    $.get(contentUrl, function (content) {
      $('#codePreviewDialog .prettyprint').text(content)
      $('#codePreviewDialog .prettyprint').removeClass("prettyprinted")
      prettyPrint()
      $('#codePreviewDialog').modal('show')
      $("#codePreviewDialog .editButton").off("click").on("click", () => {
        let designerUrl = `../designer?${scope}=${shapeName}`
        window.open(designerUrl, "designer")
      })
      $("#codePreviewDialog .editButtonGuided").off("click").on("click", () => {
        let designerUrl = `../designer?${scope}=${shapeName}&tutorial=code`
        window.open(designerUrl, "designer")
      })
    })
  }
}
