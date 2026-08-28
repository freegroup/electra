import commandStack from "./commands/CommandStack"
import session from "../../common/js/session"

import conf from "./Configuration"
let storage = require('../../common/js/BackendStorage').default(conf)


export default class Toolbar {

  constructor(app, view, elementId) {
    this.html = $(elementId)
    this.app = app
    this.view = view

    commandStack.off(this).on("change", this)

    this.createFileButton = $("#editorFileCreate")
    this.createFileButton.off("click").on("click", () => {
      this.app.fileCreateNew()
    })

    this.saveButton = $("#editorFileSave")
    this.saveButton.off("click").on("click", () => {
      this.app.fileSave()
    })

    this.copyButton = $("#editorPageCopy")
    this.copyButton.off("click").on("click", () => {
      // deepcopy of the current selected section
      //
      let clipboardPage =  {
        type: "page",
        data: JSON.parse(JSON.stringify(this.view.getPage()))
      }

      let blob = new Blob([JSON.stringify(clipboardPage,undefined,4)], {type: 'text/plain'});
      let item = new ClipboardItem({'text/plain': blob });
      navigator.clipboard.write([item ]).then( ()=>{
        $(`#editorPageCopy`).notify(
          t("message.chapter_to_clipboard"), { 
            position: "bottom left",
            gap: 20,
            showDuration: 40,
            arrowShow: false,
            className: 'info',
            autoHideDelay: 2000,
        })
      })
    })

    this.shareButton = $("#editorFileShare")
    if(session.isLoggedIn()) {
      this.shareButton.off("click").on("click", () => {
        this.app.fileShare()
      })
    }
    else{
      this.shareButton.remove()
    }


    // PDF export is a read-side action - anyone may take the document with them.
    this.pdfButton = $("#editorFileToPDF")
    this.pdfButton.off("click").on("click", () => {
      this.app.onPDFExport()
    })

    // must delegate event from parent DOM because of the dynamic property of the CSS selector
    $(".toolbar")
      .off("#editUndo").on("click", "#editUndo:not(.disabled)",() => {
        commandStack.undo()
      })
      .off('#editRedo').on("click", "#editRedo:not(.disabled)", () => {
        commandStack.redo()
      })

    // fire a fake event to render the correct state of the buttons in the toolbar
    //
    this.stackChanged({ isPreChangeEvent: ()=>false, getStack:()=>commandStack})
  }


  stackChanged(event) {
    if (event.isPreChangeEvent()) {
      return // silently
    }

    this.shareButton.hide()
    this.copyButton.hide()
    $("#editUndo, #editRedo").hide()

    // Enable the edit related buttons if the user has a valid document
    //
    if(this.app.getDocument() !==null) {
      this.copyButton.show()
      // PDF export is read-side: available to anyone with a document open.
      this.pdfButton.show()
      $("#editUndo, #editRedo").show()

      // Sharing publishes a public link - a write action, so it needs a login.
      if (session.isLoggedIn()) {
        this.shareButton.show()
      }

      $("#editUndo").addClass("disabled")
      $("#editRedo").addClass("disabled")

      if (event.getStack().canUndo()) {
        $("#editUndo").removeClass("disabled")
      }

      if (event.getStack().canRedo()) {
        $("#editRedo").removeClass("disabled")
      }
    }

    // Scope model: the only client-side distinction left is logged-in vs not.
    // Anonymous users may read but not persist (the server enforces it too), so
    // Save and Create show only for a logged-in user. Everything finer (which
    // group, promote) is governed server-side.
    if (session.isLoggedIn()) {
      this.saveButton.show()
      this.createFileButton.show()
    } else {
      this.saveButton.hide()
      this.createFileButton.hide()
    }

    if (event.getStack().canUndo()){
      $("#editorFileSave div").addClass("highlight")
      this.app.hasUnsavedChanges = true
    }

  }
}
