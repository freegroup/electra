import inputPrompt from "../common/js/InputPrompt"
import commandStack from "./commands/CommandStack"
import State from "./commands/State"
import conf from "./configuration"

const shortid = require('short-uuid')
const Page = require("./model/page").default
const MarkdownEditor = require("./editor/markdown/editor").default
const BrainEditor = require("./editor/brain/editor").default
const ImageEditor = require("./editor/image/editor").default
const Palette = require("./palette").default

export default class View {

  /**
   * @constructor
   *
   */
  constructor(app, id, permissions) {
    this.app = app
    this.markdownEditor = new MarkdownEditor()
    this.brainEditor = new BrainEditor()
    this.imageEditor = new ImageEditor()
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
      .on("click", "#sectionMenuInsertImage", event => {
        let section = this.addImage($(event.target).data("index"))
        if(section){
          this.onSelect(section)
          this.onEdit(section)
        }
        return false
      })
      .on("click", "#sectionMenuInsertMarkdown", event => {
        let section = this.addMarkdown($(event.target).data("index"))
        if(section){
          this.onSelect(section)
          this.onEdit(section)
        }
        return false
      })
      .on("click", "#sectionMenuInsertBrain", event => {
        let section = this.addBrain($(event.target).data("index"))
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

  addMarkdown(index) {
    // commit the current changes if an editor is active
    this.onCommitEdit()

    commandStack.push(new State(this.app))
    let section = {
      id: shortid.generate(),
      type: "markdown",
      content: "## Header"
    }
    this.page.add(section, index)
    if (typeof index === "number") {
      this.render(this.page)
    } else {
      this.renderMarkdown(section, index)
    }
    return section
  }

  addBrain(index) {
    // commit the current changes if an editor is active
    this.onCommitEdit()

    commandStack.push(new State(this.app))
    let section = {
      id: shortid.generate(),
      type: "brain",
      content: null
    }
    this.page.add(section, index)
    if (typeof index === "number") {
      this.render(this.page)
    } else {
      this.renderBrain(section, index)
    }
    return section
  }

  addImage(index) {
    // commit the current changes if an editor is active
    this.onCommitEdit()

    commandStack.push(new State(this.app))
    let section = {
      id: shortid.generate(),
      type: "image",
      content: null
    }
    this.page.add(section, index)
    if (typeof index === "number") {
      this.render(this.page)
    } else {
      this.renderImage(section, index)
    }
    return section
  }

  render(page) {

    // inject the host for the rendered section
    this.html.html($("<div class='sections'></div>"))
    this.renderSpacer(0)
    page.forEach((section, index) => {
      switch (section.type) {
        case "brain":
          this.renderBrain(section)
          break
        case "markdown":
          this.renderMarkdown(section)
          break
        case "image":
          this.renderImage(section)
          break
        default:
          this.renderUnknown(section)
          break
      }
      this.renderSpacer(index + 1)
    })
  }

  renderMarkdown(section) {
    let errorCSS = ""
    let markdown = section.content
    try {
      markdown = this.markdownEditor.render(section.content)
    } catch (error) {
      console.log(error)
      errorCSS = "error"
    }
    this.html.find(".sections").append(`
        <div data-id="${section.id}" class='section ${errorCSS}'>
           <div class="sectionContent markdownRendering" data-type="markdown">${markdown}</div>
        </div>
      `)
  }

  renderBrain(section) {
    if (section.content) {
      this.html.find(".sections").append(`
        <div data-id="${section.id}" class='section'>
            <img class="sectionContent" data-type="brain" src="${section.content.image}">
        </div>
      `)
    } else {
      this.html.find(".sections").append(`
        <div data-id="${section.id}" class='section'>
            <div class="sectionContent" data-type="brain">-double click to edit brain-</div>
        </div>
      `)
    }
  }

  renderImage(section) {
    if (section.content) {
      this.html.find(".sections").append(`
        <div data-id="${section.id}" class='section'>
            <div class="sectionContent" data-type="image">
              <img data-type="image" src="${section.content}">
            </div>
        </div>
      `)
    } else {
      this.html.find(".sections").append(`
        <div data-id="${section.id}" class='section'>
            <div class="sectionContent" data-type="image">-double click to edit image-</div>
        </div>
      `)
    }
  }

  renderSpacer(index) {
    this.html.find(".sections").append(`
        <div class='section'>
          <div class='sectionContent ' data-type="spacer" >
            <div data-index="${index}" id="sectionMenuInsertMarkdown"  class='material-button' ><i class="fa fa-plus"></i> Text</div>
            <div data-index="${index}" id="sectionMenuInsertBrain"     class='material-button' ><i class="fa fa-plus"></i> Diagram</div>
            <div data-index="${index}" id="sectionMenuInsertImage"     class='material-button' ><i class="fa fa-plus"></i> Picture</div>
          </div>
        </div>
      `)
  }

  renderUnknown(section) {
    this.html.find(".sections").append(`
        <div data-id="${section.id}" class='section'>
           <div class="sectionContent" data-type="unknown">Unknown section type</div>
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
          <div data-id="${section.id}" id="sectionMenuUp"     class='fa fa-caret-square-o-up' ></div>
          <div data-id="${section.id}" id="sectionMenuDown"   class='fa fa-caret-square-o-down' ></div>
          <div data-id="${section.id}" id="sectionMenuEdit"   class='fa fa-edit' ></div>
          <div data-id="${section.id}" id="sectionMenuDelete" class='fa fa-trash-o' ></div>
        </div>`)
  }


  onUnselect() {
    if (this.currentEditor) {
      return
    }
    if (this.activeSection === null) {
      return
    }
    $(".activeSection .tinyFlyoverMenu").remove()
    this.activeSection.removeClass("activeSection")
    this.activeSection = null
  }


  onEdit(section) {
    if (this.currentEditor) {
      return
    }

    let type = section.type

    let menu = $(".activeSection .tinyFlyoverMenu")

    menu.html(`
          <div data-id="${section.id}" id="sectionMenuCommitEdit" class='fa fa-check-square-o' ></div>
          <div data-id="${section.id}" id="sectionMenuCancelEdit" class='fa fa-minus-square-o' ></div>
        `)
    switch(type){
      case 'markdown':
        this.currentEditor = this.markdownEditor.inject(section)
        $(".sections").removeClass("activeSection")
        break
      case 'brain':
        this.currentEditor = this.brainEditor.inject(section)
        $(".sections").removeClass("activeSection")
        break
      case 'image':
        this.currentEditor = this.imageEditor.inject(section)
        $(".sections").removeClass("activeSection")
        break
    }
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
