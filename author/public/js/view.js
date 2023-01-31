const shortid = require('short-uuid')

import inputPrompt from "../../common/js/InputPrompt"
import commandStack from "./commands/CommandStack"
import State from "./commands/State"

import Page from "./model/page"
import editorByType from "./editor/editorByType"
import Palette from"./palette"

export default class View {

  /**
   * @constructor
   *
   */
  constructor(app, id, permissions) {
    this.app = app
    this.page = new Page()
    this.activeSection = null
    this.currentEditor = null
    this.html = $(id)
    this.palette = new Palette(app, this, permissions, "#paletteElements")

    this.palette.render()

    commandStack.off(this).on("change", this)

    this.showWelcomeMessage()

    $(document)
      .on("click", ".content", () => {
        this.onUnselect()
      })
      .on("click", ".sections .section", event => {
        let section = this.page.get($(event.target).closest(".section").data("id"))
        if(section) {
          this.onSelect(section)
        }
        return false
      })
      .on("click", "#sectionMenuUp", event => {
        let id = $(event.target).data("id")
        let index = this.page.index(id)
        if (index > 0) {
          commandStack.push(new State(this.app))
          let prev = this.activeSection.prev()
          this.activeSection.insertBefore(prev)
          this.page.move(index, index - 1)
        }
        return false
      })
      .on("click", "#sectionMenuDown", event => {
        let id = $(event.target).data("id")
        let index = this.page.index(id)
        if (index < this.page.length - 1) {
          commandStack.push(new State(this.app))
          let prev = this.activeSection.next()
          this.activeSection.insertAfter(prev)
          this.page.move(index, index + 1)
        }
        return false
      })
      .on("dblclick", ".sections .section", event => {
        let section = this.page.get($(event.target).closest(".section").data("id"))
        if(section) {
          this.onSelect(section)
          this.onEdit(section)
        }
        return false
      })
      .on("click", "#sectionMenuEdit", event => {
        this.onEdit(this.page.get($(event.target).data("id")))
        return false
      })
      .on("click", "#sectionMenuDelete", event => {
        this.onDelete(this.page.get($(event.target).data("id")))
        return false
      })
      .on("click", "#sectionMenuCommitEdit", event => {
        this.onCommitEdit(this.page.get($(event.target).data("id")))
        return false
      })
      .on("click", "#sectionMenuCancelEdit", event => {
        this.onCancelEdit()
        return false
      })
      .on("click", ".sectionMenuInsertSection", event => {
        let index = $(event.target).data("index")
        let type = $(event.target).data("type")
        let section = this.addSection(type,index)
        if(section){
          this.onSelect(section)
          this.onEdit(section)
        }
        return false
      })
  }

  setPage(page) {
    // commit the current changes if an editor is active
    this.onCommitEdit()

    // scroll to top
    $(".content").scrollTop(0)

    $(".pageElement").removeClass("selected")
    $(`.pageElement[data-page='${page.id}']`).addClass("selected")
    this.page = page
    this.render(this.page)
  }

  getPage() {
    return this.page
  }

  removePage(page){
    // commit the current changes if an editor is active
    if(page === this.page) {
      let index = this.app.getDocument().index(page)
      this.onCommitEdit()
      if(index >0){
        let newPage = this.app.getDocument().get(index-1)
        this.setPage(newPage)
      }
      else if(this.app.getDocument().length >1 ){
        let newPage = this.app.getDocument().get(1)
        this.setPage(newPage)
      }
    }

    this.app.getDocument().removePage(page)
  }


  addPage() {
    // commit the current changes if an editor is active
    this.onCommitEdit()

    inputPrompt.show("Add new Chapter", "Chapter name").then( value => {
      commandStack.push(new State(this.app))
      let page = new Page()
      page.name = value
      this.app.getDocument().push(page)
      this.setPage(page)
      let section = this.addMarkdown(0)
      this.onSelect(section)
      this.onEdit(section)
    })
  }

  addSection(type, index){
    // commit the current changes if an editor is active
    this.onCommitEdit()

    // save the last state for undo/redo
    commandStack.push(new State(this.app))

    let section = {
      id: shortid.generate(),
      type: type,
      content: editorByType(type).defaultContent()
    }
    this.page.add(section, index)
    // if the "index" is a number, we would insert a section in the middle of the page.
    // in this case it is the best to render the whole page. At the moment an edit can only
    // "append" its content to a page.
    if (typeof index === "number") {
      this.render(this.page)
    } 
    else {
      editorByType(type).render(this.html.find(".sections"), section)
    }
    return section    
  }


  render(page) {
    // inject the host for the rendered section
    this.html.html($("<div class='sections'></div>"))
    this.renderSpacer(0)
    page.forEach((section, index) => {
      editorByType(section.type).render(this.html.find(".sections"), section)
      this.renderSpacer(index + 1)
    })
  }

  renderSpacer(index) {
    this.html.find(".sections").append(`
        <div class='section'>
          <div class='sectionContent ' data-type="spacer" >
            <div data-index="${index}" data-type="markdown" class='sectionMenuInsertSection material-button' >&#8853; Text</div>
            <div data-index="${index}" data-type="cloze"    class='sectionMenuInsertSection material-button' >&#8853; Cloze</div>
            <div data-index="${index}" data-type="brain"    class='sectionMenuInsertSection material-button' >&#8853; Diagram</div>
            <div data-index="${index}" data-type="image"    class='sectionMenuInsertSection material-button' >&#8853; Picture</div>
          </div>
        </div>
      `)
  }

  onSelect(section) {
    if (this.currentEditor) {
      return
    }

    this.onUnselect()
    this.activeSection = $(`.section[data-id='${section.id}']`)
    this.activeSection.addClass('activeSection')
    $(".sections .activeSection").prepend(`
        <div class='tinyFlyoverMenu'>
          <div data-id="${section.id}" id="sectionMenuUp"     >&#8657;</div>
          <div data-id="${section.id}" id="sectionMenuDown"   >&#8659;</div>
          <div data-id="${section.id}" id="sectionMenuEdit"   >&#9998;</div>
          <div data-id="${section.id}" id="sectionMenuDelete" >&#8855;</div>
        </div>`)
  }


  onUnselect() {
    if (this.currentEditor) {
      return
    }

    $(".activeSection .tinyFlyoverMenu").remove()
    this.activeSection?.removeClass("activeSection")
    this.activeSection = null
  }

  onEdit(section) {
    if (this.currentEditor) {
      return
    }

    $(".activeSection .tinyFlyoverMenu").html(`
          <div data-id="${section.id}" id="sectionMenuCommitEdit" class="material-button">Save</div>
          <div data-id="${section.id}" id="sectionMenuCancelEdit" class="material-button">Cancel</div>
        `)
    this.currentEditor = editorByType(section.type)
    this.currentEditor.inject(section)
    $(".sections").removeClass("activeSection")
  }

  onDelete(section) {
    commandStack.push(new State(this.app))
    this.page.remove(section.id)
    this.render(this.page)
  }

  onCommitEdit() {
    if(this.currentEditor === null){
      return
    }

    commandStack.push(new State(this.app))
    this.currentEditor.commit()
      .then(() => {
        this.currentEditor = null;
        $(".editorContainerSelector").remove()
        this.render(this.page)
        this.palette.render()
      })
  }

  onCancelEdit() {
    if (this.currentEditor === null) {
      return
    }

    this.currentEditor.cancel()
      .then(() => {
        $(".editorContainerSelector").remove()
        this.currentEditor = null;
        this.render(this.page)
        this.palette.render()
      })
  }

  showWelcomeMessage(){
    let tmpl = $("#welcomeTemplate").html()
    $("#editor .content").html(tmpl)

    $("#welcomeNewDocument").on("click", ()=>{
      this.app.fileNew("NewDocument","user")
    })
    $("#welcomeOpenExample").on("click", ()=>{
      this.app.load("/basic/math/binary-addition.sheet","global")
    })
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
    $("#editUndo").addClass("disabled")
    $("#editRedo").addClass("disabled")

    if (event.getStack().canUndo()) {
      $("#editUndo").removeClass("disabled")
    }

    if (event.getStack().canRedo()) {
      $("#editRedo").removeClass("disabled")
    }
  }
}
