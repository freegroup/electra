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

    // Identify by the figure's NAME. That is the identifier indexBuilder.js
    // derives from the path and marks FROZEN - draw2d serialises it as the
    // figure `type`, so it is correct even in documents whose stored
    // userData.file is a legacy short path (guides/intro.brain holds
    // "gate/AND.shape", which matches no entry and used to fall through to the
    // display name - and both AND notations are called "AND").
    let catalog = componentIndex.catalog || []
    let base = shapeName.replace(/\.shape$/, "")
    let entry = catalog.find((e) => e.name === figure.NAME)
             || catalog.find((e) => e.fullName === base)
             || catalog.find((e) => e.displayName === displayName)

    // The same preview the palette shows, addressed by the same version uuid.
    let preview = componentIndex.imageUrl(entry)

    let render = (content) => {
      $('#markdownDialog .sectionContent').html(content ? md.render(content) : "")
      $('#markdownDialog .media-heading').html(displayName)

      // Hide the slot rather than leave a broken image when the component has
      // no preview, or is gone from this context.
      let slot = $('#markdownDialog .componentPreview')
      slot.toggle(!!preview)
      slot.find("img").attr({ src: preview || "", alt: displayName })

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
