import fs from "path-browserify"

import mdFactory from "../../../common/js/markdown"
let md = mdFactory()

import componentIndex from "../../../common/js/ComponentIndex"

class Dialog {

  constructor() {
  }

  show(figure) {
    let shapeName = figure.attr("userData.file")
    if (!shapeName) return
    let displayName = figure.attr("userData.displayName") ?? fs.basename(shapeName, ".shape")

    // The description lives in the component's .part document in the database.
    // The catalogue loaded for the open document maps a component to the exact
    // version uuid; match by the suffix-less path it was built from (fullName),
    // falling back to the display name for documents saved before the scope
    // model. No match (component gone from this context) -> heading only.
    let base = shapeName.replace(/\.shape$/, "")
    let entry = (componentIndex.catalog || []).find(
      (e) => e.fullName === base || e.displayName === displayName
    )

    let render = (content) => {
      $('#markdownDialog .sectionContent').html(content ? md.render(content) : "")
      $('#markdownDialog .media-heading').html(displayName)
      $('#markdownDialog').modal('show')
    }

    if (!entry || !entry.uuid) {
      render("")
      return
    }

    $.get(`../shapes/part/${encodeURIComponent(entry.uuid)}/md`)
      .done((content) => render(content))
      .fail(() => render(""))
  }
}

let dialog = new Dialog()
export default dialog
