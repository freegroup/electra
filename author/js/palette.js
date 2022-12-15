import inputPrompt from "../common/js/InputPrompt"

import commandStack from "./commands/CommandStack"
import State from "./commands/State";

export default class Palette {

  constructor(app, view, permissions, elementId) {
    this.html = $(elementId)
    this.app = app
    this.view = view
    this.permissions = permissions
    commandStack.off(this).on("change", this)


    $(document)
      .off("click", "#documentPageAdd")
      .on("click", "#documentPageAdd", () => {
        this.app.view.addPage()
      })
      .off("click", ".pageElement .page_edit_name")
      .on("click", ".pageElement .page_edit_name", (event) => {
        let page = this.app.getDocument().getPage($(event.currentTarget).data("page"))
        inputPrompt.show("Rename Pager", "Page name", page.name, value => {
          commandStack.push(new State(this.app))
          page.name = value
          this.stackChanged(null)
        })
        return false
      })
      .off("click", ".pageElement .page_delete")
      .on("click", ".pageElement .page_delete", (event) => {
        commandStack.push(new State(this.app))
        let page = this.app.getDocument().getPage($(event.currentTarget).data("page"))
        this.view.removePage(page)
        this.stackChanged(null)
        return false
      })
      .off("click", ".pageElement")
      .on("click", ".pageElement", (event) => {
        $(".pageElement").removeClass("selected")
        let element = $(event.target)
        let id = element.data("page")
        let page = this.app.getDocument().getPage(id)
        this.app.view.setPage(page)
        element.addClass("selected")
      })
  }


  render() {
    // restore all classes from the other editors
    $("#paletteElementsScroll, #paletteFilter").addClass("pages")
    $("#paletteFilter").html(`<div class='toc'>Chapters <span id="documentPageAdd" class="material-button">+</span></div>`)
    this.stackChanged(null)
  }

  /**
   * @method
   * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
   * can be used to identify the type of event which has occurred.
   *
   * @template
   *
   * @param {draw2d.command.CommandStackEvent} event
   **/
  stackChanged(event) {

    if (this.sourceIsSortEvent) {
      return // silently
    }

    this.html.html('')
    let document = this.app.getDocument()
    if(document !==null) {
      let pages = document.getPages()
      let currentPage = this.view.getPage()

      if (this.app.hasModifyPermissionForCurrentFile()) {
        $("#documentPageAdd").show()
        pages.forEach((page) => {
          this.html.append(`
          <div class="pageElement"  data-page="${page.id}"  id="layerElement_${page.id}" >
            ${page.name}
            <span data-page="${page.id}"  data-toggle="tooltip" title="Delete the page" class="page_action page_delete pull-right" >
                <span class="fa fa-trash"/>
            </span>
            <span data-page="${page.id}"  data-toggle="tooltip" title="Edit Name of Chapter" class="page_action page_edit_name pull-right" >
                <span class="fa fa-edit"/>
            </span>
          </div>`)
        }, true)
      } else {
        $("#documentPageAdd").hide()
        pages.forEach((page) => {
          this.html.append(`
          <div class="pageElement"  data-page="${page.id}"  id="layerElement_${page.id}" >
            ${page.name}
          </div>`)
        }, true)
      }


      $(`.pageElement[data-page=${currentPage.id}]`).addClass("selected")


      // Allow only the drag&drop of the pages if the user has the permission
      //
      if (this.app.hasModifyPermissionForCurrentFile()) {
        this.html.sortable({
          axis: "y",
          update: (event, dd) => {
            this.sourceIsSortEvent = true
            try {
              commandStack.push(new State(this.app))
              // fetch the state of the new order
              let pageDivs = $(".pageElement").toArray()
              let newPageOrder = []
              pageDivs.forEach((page) => {
                let id = $(page).data("page")
                newPageOrder.push(document.getPage(id))
              })
              document.setPages(newPageOrder)
            } finally {
              this.sourceIsSortEvent = false
            }
          }
        })
      }
    }
    else{
      $("#documentPageAdd").hide()
    }
  }

}
