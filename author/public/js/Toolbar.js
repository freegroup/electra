import commandStack from "./commands/CommandStack"

import conf from "./Configuration"
let storage = require('../../common/js/BackendStorage').default(conf)


export default class Toolbar {

  constructor(app, view, elementId, permissions) {
    this.html = $(elementId)
    this.app = app
    this.view = view
    this.permissions = permissions

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
    if(permissions.featureset.share) {
      this.shareButton.off("click").on("click", () => {
        this.app.fileShare()
      })
    }
    else{
      this.shareButton.remove()
    }


    this.pdfButton = $("#editorFileToPDF")
    if (permissions[this.app.objectType].pdf || permissions[this.app.objectType].global.pdf) {
      this.pdfButton.off("click").on("click", () => {
        this.app.onPDFExport()
      })
    } else {
      this.pdfButton.hide()
    }

    // must delegate event from parent DOM because of the dynamic property of the CSS selector
    $(".toolbar")
      .off("#editUndo")
      .delegate("#editUndo:not(.disabled)","click", () => {
        commandStack.undo()
      })
      .off('#editRedo')
      .delegate("#editRedo:not(.disabled)", "click", () => {
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

    this.pdfButton.hide()
    this.shareButton.hide()
    this.copyButton.hide()
    
    // check the permission if the current file is "user" scope
    if(this.app.getDocument() !==null) {
      if (this.app.currentFile.scope === "user") {
        if (this.permissions[this.app.objectType].pdf === true) {
          this.pdfButton.show()
        }
      } else if (this.app.currentFile.scope === "global") {
        if (this.permissions[this.app.objectType].global.pdf === true) {
          this.pdfButton.show()
        }
      }

      if (this.permissions.featureset.share) {
        this.shareButton.show()
      }
    }

    if(this.app.hasModifyPermissionForCurrentFile()){
      $("#editUndo, #editRedo").show()
      this.pdfButton.show()
      this.saveButton.show()
      this.createFileButton.show()
      this.copyButton.show()
    }
    else{
      $("#editUndo, #editRedo").hide()
      this.pdfButton.hide()
      this.saveButton.hide()
      this.createFileButton.hide()
      this.copyButton.hide()
    }

    if (event.getStack().canUndo()){
      $("#editorFileSave div").addClass("highlight")
      this.app.hasUnsavedChanges = true
    }

  }
}
