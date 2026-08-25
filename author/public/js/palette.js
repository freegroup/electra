import inputPrompt from "../../common/js/InputPrompt"
import authorDialog from "../../common/js/AuthorDialog"
import { icon } from "../../common/js/icons"

import commandStack from "./commands/CommandStack"
import State from "./commands/State"

export default class Palette {

  constructor(app, view, permissions, elementId) {
    this.html = $(elementId)
    this.app = app
    this.view = view
    this.permissions = permissions
    this.sourceIsSortEvent = false
    this.hideMenu = ()=>{ 
      $("body").off( "click", this.hideMenu)
      $('#toggle').attr('checked', false);
    }

    commandStack.off(this).on("change", this)

    $(document)
      .off("click", "#documentPageAdd")
      .on("click", "#documentPageAdd", () => {
        this.app.view.addPage()
      })
      .off("click", "#documentClipboardPaste")
      .on("click", "#documentClipboardPaste", () => {
        this.app.view.pastePage()
        .then( ()=>{
          this.render()
        })
      })
      .off("click", ".pageElement .chapter_edit_name")
      .on("click", ".pageElement .chapter_edit_name", (event) => {
        if (!this.app.isEditable()) {
          return false
        }
        let page = this.app.getDocument().find($(event.currentTarget).data("page"))
        // Result via .then. The 4th argument is a description string; a function
        // there was taken by jQuery as a .text() setter and called with
        // (index, ...) - which left the chapter name set to 0.
        inputPrompt.show(t("message.rename_chapter"), t("common:label.name"), page.name)
          .then((value) => {
            return commandStack.push(new State(this.app))
              .then((doneCallback) => {
                page.name = value
                doneCallback()
              })
          })
          .catch(() => { /* cancelling is not an error */ })
        return false
      })
      
      .off("click", ".chapter_help")
      .on("click", ".chapter_help", (event) => {
        authorDialog.show(`/readme/en/author/page.sheet`, t("label.chapter"))
        return false
      })
      .off("click", ".pageElement .chapter_delete")
      .on("click", ".pageElement .chapter_delete", (event) => {
        // Before the push, or an undo step lands on the stack with no change
        // behind it.
        if (!this.app.isEditable()) {
          return false
        }
        commandStack.push(new State(this.app)).then( doneCallback => {
          let page = this.app.getDocument().find($(event.currentTarget).data("page"))
          this.view.removePage(page).then( ()=>{
            doneCallback()
          })
        })
        return false
      })
      .off("click", ".pageElement")
      .on("click", ".pageElement", (event) => {
        $(".pageElement").removeClass("selected")
        let element = $(event.currentTarget)
        let id = element.data("page")
        let page = this.app.getDocument().find(id)
        this.app.view.setPage(page)
        element.addClass("selected")
      })
  }


  render() {

    // restore all classes from the other editors
    $("#paletteElementsScroll, #paletteFilter").addClass("pages")
    $("#paletteElements").addClass("list")

    $("#paletteFilter").html(`
      <div class='toc'>
        <span data-i18n="label.chapter">${t("label.chapter")}</span>
        <span class="chapter_help list-item-action">${icon("circleHelp", { strokeWidth: 2.2 })}</span>
        <div class="fabButton" id="documentContentAdd" >
          <input type="checkbox" id="toggle"/>
          <label class="button" for="toggle"></label>
          <nav class="nav">
            <ul>
              <a data-i18n="button.add_chapter"   id="documentPageAdd" >${t("button.add_chapter")}</a>
              <a data-i18n="button.paste_chapter" id="documentClipboardPaste" >${t("button.paste_chapter")}</a>
            </ul>
          </nav>
        </div>
      </div>
    `)

    let _this = this
    $("#toggle").change(function() {
      $("body").off( "click", _this.hideMenu)
      if(this.checked) {
        $("body").on( "click", _this.hideMenu)
      }
    });

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

      $("#documentContentAdd").toggle(this.app.isEditable())
      pages.forEach((page) => {
        // No learning cap here: the learning nature only matters at export, where
        // the three-variant choice makes it self-explanatory.
        this.html.append(`
        <div class="pageElement list-item"  data-page="${page.id}"  id="layerElement_${page.id}">
          <span>${page.name}</span>
          <span class="spacer"></span>
          <span class="list-item-actions">
            <span data-page="${page.id}"  class="list-item-action chapter_edit_name" >${icon("pencil", { strokeWidth: 2.2 })}</span>
            <span data-page="${page.id}"  class="list-item-action chapter_delete" >${icon("trash", { strokeWidth: 2.2 })}</span>
          </span>
        </div>`)
      }, true)  

      $(`.pageElement[data-page=${currentPage.id}]`).addClass("selected")

      // Allow only the drag&drop of the pages if the user has the permission
      //
      this.html.sortable({
        axis: "y",
        // Disabled rather than vetoed in update(): jQuery UI reorders the DOM
        // while dragging, so a late veto would leave the list in an order the
        // document does not have.
        disabled: !this.app.isEditable(),
        update: (event, dd) => {
          this.sourceIsSortEvent = true
          commandStack.push(new State(this.app)).then( doneCallback => {
            // fetch the state of the new order
            let pageDivs = $(".pageElement").toArray()
            let newPageOrder = []
            pageDivs.forEach((page) => {
              let id = $(page).data("page")
              newPageOrder.push(document.find(id))
            })
            document.setPages(newPageOrder)
            doneCallback()
          }).finally( () => {
            this.sourceIsSortEvent = false
          })
        }
      })
    }
    else{
      $("#documentContentAdd").hide()
    }
  }

}
