const shortid = require('short-uuid')

import inputPrompt from "../../common/js/InputPrompt"
import authorDialog from "../../common/js/AuthorDialog"
import commandStack from "./commands/CommandStack"

import State from "./commands/State"

import Page from "./model/page"
import editorByType from "./editor/editorByType"
import Palette from"./palette"
import renderMode from "./renderMode"

export default class View {

  /**
   * @constructor
   *
   */
  constructor(app, id, permissions) {
    this.app = app
    this.page = new Page()
    this.activeSectionDom = null
    this.activeSection = null
    this.currentEditor = null
    this.html = $(id)
    this.clipboardSection = null
    this.palette = new Palette(app, this, permissions, "#paletteElements")

    this.palette.render()

    commandStack.off(this).on("change", this)

    this.showWelcomeMessage()

    $(document)
      .on("click", ".content", () => {
        this.onUnselect()
      })
      .on("click", ".sections .section", event => {
        // allow an <a href="..."> links to work within a section
        if(event.target.nodeName === "A"){
          return true;
        }

        let section = this.page.get($(event.target).closest(".section").data("id"))
        if(section) {
          this.onSelect(section)
        }
        return false
      })
      .on("dblclick", ".sections .section:not(.editMode)", event => {
        let section = this.page.get($(event.target).closest(".section").data("id"))
        if(section) {
          this.onEdit(section)
        }
        return false
      })
      .on("click", ".sectionMenuEdit", event => {
        this.onEdit(this.page.get($(event.target).data("id")))
        return false
      })
      .on("click", ".sectionMenuCopy", event => {
        this.onCopy(this.page.get($(event.currentTarget).data("id")))
        return false
      })
      .on("click", ".sectionMenuDelete", event => {
        this.onDelete(this.page.get($(event.target).data("id")))
        return false
      })
      .on("click", ".sectionMenuFlip", event => {
        this.onFlip(this.page.get($(event.currentTarget).data("id")))
        return false
      }) 
      .on("click", ".sectionMenuHelp", event => {
        let type = this.page.get($(event.target).closest(".section").data("id"))?.type ?? "generic"
        authorDialog.show(`/readme/en/author/${type}.sheet`)
        return false
      })
      .on("click", ".sectionMenuCommitEdit", event => {
        let editedSection = this.activeSection
        this.onCommitEdit().then( ()=>{
          this.activeSection = null
          this.onSelect(editedSection)
        })
        return false
      })
      .on("click", ".sectionMenuCancelEdit", event => {
        let editedSection = this.activeSection
        this.onCancelEdit().then( ()=>{
          this.activeSection = null
          this.onSelect(editedSection)
        })
        return false
      })
      .on("click", ".sectionMenuInsertSection", event => {
        let index = $(event.target).data("index")
        let type = $(event.target).data("type")
        let editor = editorByType(type)
        this.addSection(type, index).then( section => {
          if(editor.startEditAfterInsert(section)){
            this.onEdit(section)
          }
          else {
            this.onSelect(section)
          }
        })
        return false
      })
  }

  setPage(page) {
    // commit the current changes if an editor is active
    this.onCommitEdit().then(()=>{ 
      this.onUnselect()
      
      // scroll to top
      $(".content").scrollTop(0)

      $(".pageElement").removeClass("selected")
      $(`.pageElement[data-page='${page.id}']`).addClass("selected")
      this.page = page
      this.render(this.page)     
    })
  }

  getPage() {
    return this.page
  }

  removePage(page){
    // commit the current changes if an editor is active
    // Keep the state clean. 
    //
    if(page === this.page) {
      let index = this.app.getDocument().index(page)
      return this.onCancelEdit()
        .then(()=>{
          console.log(222)
          if(index >0){
            let newPage = this.app.getDocument().get(index-1)
            this.setPage(newPage)
          }
          else if(this.app.getDocument().length >1 ){
            let newPage = this.app.getDocument().get(1)
            this.setPage(newPage)
          }  
          this.app.getDocument().remove(page)   
          return page   
        })
        .catch (exc => {
          console.log(exc)
        })
    } 
    else {
      return new Promise((resolve, reject) => {
        this.app.getDocument().remove(page)
        resolve(page)
      })
    }
  }


  addPage() {
    // commit the current changes if an editor is active
    this.onCommitEdit().then(()=>{
      inputPrompt.show(t("dialog.add_chapter"), t("label.name")).then( value => {
        commandStack.push(new State(this.app)).then( doneCallback => {
          let page = new Page()
          page.name = value
          this.app.getDocument().push(page)
          this.setPage(page)
          doneCallback()
        })
      })      
    })
  }

  pastePage() {
    // commit the current changes if an editor is active
    return this.onCommitEdit()
      .then(()=>{   
        return commandStack.push(new State(this.app))   
      })
      .then( doneCallback => {
        return navigator.clipboard.readText()
      }) 
      .then((clipText) => {
        let json = JSON.parse(clipText)
        if(!("type" in json && "data" in json)){
          throw new Error(t("error.clipboard_not_page"))
        }
        if( json.type !== "page"){
          throw new Error(t("error.clipboard_not_page"))
        }
        json.data.id = shortid.generate()
        json.data.name = json.data.name+"Copy"
        json.data.sections.forEach( section => section.id = shortid.generate())
        let page = new Page(json.data)
        this.app.getDocument().push(page)
        this.setPage(page)
        return page
      })
      .catch( exc => {
        $(`#editorPageCopy`).notify(
          t("error.copy_before_paste"), 
          { position: "bottom left",
          gap: 20,
          showDuration: 100,
          arrowShow: true,
          className: 'info',
          autoHideDelay: 6000,
        });
      });
  }

  addSection(type, index){
    // commit the current changes if an editor is active
    return this.onCommitEdit().then(()=>{
      // save the last state for undo/redo
      return commandStack.push(new State(this.app)).then( doneCallback => {
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
          let editor = editorByType(type)
          let content = editor.render(section, renderMode.EDITOR)
          editor.append(this.html.find(".sections"), content)
        }
        doneCallback()
        return section         
      })
    })
  }

  render(page) {
    // inject the host for the rendered section
    this.html.html($("<div class='sections'></div>"))
    let whereToAppend = this.html.find(".sections")

    if(page.length === 0){
      let content =  editorByType("empty-chapter").render(null, renderMode.EDITOR)
      whereToAppend.append(`
      <div class='section'>
          ${content}
      </div>`)
      return 
    }

    this.renderSpacer(whereToAppend, 0) 
    page.forEach((section, index) => {
      let editor = editorByType(section.type)
      let content = editor.render(section, renderMode.EDITOR)
      whereToAppend.append(`<div class='section' data-id="${section.id}" data-type="${section.type}"></div>`)
      let sectionNode = whereToAppend.find(`*[data-id='${section.id}']`)
      editor.append(sectionNode, content)
      sectionNode.append(`
            <div class="fc">
              <div class='tinyFlyoverMenu'>
                ${editor.getMenu(section)}
                <div data-id="${section.id}" class="sectionMenuEdit"   >&#9998;</div>
                <div data-id="${section.id}" class="sectionMenuCopy"   ><img src="../common/images/clipboard.svg"></div>
                <div                         class="sectionMenuHelp"   >?</div>
                <div data-id="${section.id}" class="sectionMenuDelete" >&#8855;</div>
              </div>  
            </div>`)

      this.renderSpacer(whereToAppend, index + 1)
      delete section.flippedStateDuringInject
    })
  }

  renderSpacer(whereToAppend, index) {
    whereToAppend.append(`
        <div class='section'>
          <div class='sectionContent ' data-type="spacer" >
            <button data-i18n="button.add_text"      data-index="${index}" data-type="wysiwyg"   class='sectionMenuInsertSection electra-button' >${t("button.add_text")}</button>
            <button data-i18n="button.add_cloze"     data-index="${index}" data-type="cloze"     class='sectionMenuInsertSection electra-button' >${t("button.add_cloze")}</button>
            <button data-i18n="button.add_flashcard" data-index="${index}" data-type="flashcard" class='sectionMenuInsertSection electra-button' >${t("button.add_flashcard")}</button>
            <button data-i18n="button.add_timing"    data-index="${index}" data-type="timing"    class='sectionMenuInsertSection electra-button' >${t("button.add_timing")}</button>
            <button data-i18n="button.add_brain"     data-index="${index}" data-type="brain"     class='sectionMenuInsertSection electra-button' >${t("button.add_brain")}</button>
            <button data-i18n="button.add_image"     data-index="${index}" data-type="image"     class='sectionMenuInsertSection electra-button' >${t("button.add_image")}</button>
          </div>
        </div>
      `)
  }

  onSelect(section) {
    if (this.currentEditor) {
      return
    }

    if(this.activeSection === section){
      return // silently
    }

    this.onUnselect()
    let editor = editorByType(section.type)
    this.activeSection = section
    this.activeSectionDom = $(`.section[data-id='${section.id}']`)
    this.activeSectionDom.addClass('activeSection')
    editor.onSelect(section)
  }


  onUnselect() {
    if (this.currentEditor) {
      return
    }

    if(this.activeSection === null){
      return // silently
    }

    let section = this.page.get($(".activeSection").data("id"))
    if(section){
      editorByType(section.type).onUnselect(section)
    }

    this.activeSectionDom?.removeClass("activeSection")
    this.activeSectionDom = null
    this.activeSection = null
  }

  onEdit(section) {
    this.onCommitEdit().then( () => {
      this.onSelect(section)
      $(".activeSection .tinyFlyoverMenu").html(`
        <div data-i18n="common:button.save"   data-id="${section.id}" class="sectionMenuCommitEdit electra-button">${t("common:button.save")}</div>
        <div data-i18n="common:button.cancel" data-id="${section.id}" class="sectionMenuCancelEdit electra-button">${t("common:button.cancel")}</div>
      `)
      this.currentEditor = editorByType(section.type)
      this.currentEditor.inject(section)
      $(".sections").removeClass("activeSection")
    })
  }

  onCopy(section) {
    // deepcopy of the current selected section
    //
    let clipboardSection =  {
      type: "section",
      data: JSON.parse(JSON.stringify(section))
    }

    let blob = new Blob([JSON.stringify(clipboardSection,undefined,4)], {type: 'text/plain'});
    let item = new ClipboardItem({'text/plain': blob });
    navigator.clipboard.write([item ]).then( ()=>{
      $(`.section[data-id='${section.id}'] .tinyFlyoverMenu`).notify(
        t("message.section_to_clipboard"), 
        { position: "bottom right",
        gap: 20,
        showDuration: 40,
        arrowShow: false,
        className: 'info',
        autoHideDelay: 2000,
      });
    })
  }

  onDelete(section) {
    commandStack.push(new State(this.app))
    .then( doneCallback => {
      $(`.section[data-id="${section.id}"]`).slideToggle(400, ()=>{
        this.page.remove(section.id)
        this.render(this.page)
        doneCallback()
      })
    })
  }

  onFlip(section) {
    let card = $(`[data-id='${section.id}'] .flip_box`)

    if (card.hasClass('flipped-back')) {
        // Restart animaton, See: https://css-tricks.com/restart-css-animation/
        card.removeClass('flipped-back');
        void card[0].offsetWidth;
      
      card.addClass('flipped-front');
    }
    else{
      // Restart animaton, See: https://css-tricks.com/restart-css-animation/
      card.removeClass('flipped-front');
      void card[0].offsetWidth;

      card.addClass('flipped-back');
    }
  }

  onCommitEdit() {
    if(this.currentEditor === null){
      return Promise.resolve();
    }

    return commandStack.push(new State(this.app)).then( doneCallback => {
      return this.currentEditor.commit()
        .then(() => {
          this.currentEditor = null;
          $(".editorContainerSelector").remove()
          this.render(this.page)
          this.palette.render()
          doneCallback()
        })
      })
  }

  onCancelEdit() {
    if (this.currentEditor === null) {
      return Promise.resolve();
    }

    return this.currentEditor.cancel()
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


