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

    this.pdfButton.hide()
    this.shareButton.hide()
    this.copyButton.hide()
    $("#editUndo, #editRedo").hide()
    this.copyButton.hide()

    // Enable the edit related buttons if the user has a valid document
    // 
    if(this.app.getDocument() !==null) {
      this.copyButton.show()
      $("#editUndo, #editRedo").show()
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
      
      $("#editUndo").addClass("disabled")
      $("#editRedo").addClass("disabled")
  
      if (event.getStack().canUndo()) {
        $("#editUndo").removeClass("disabled")
      }
  
      if (event.getStack().canRedo()) {
        $("#editRedo").removeClass("disabled")
      }  
    }

    if(this.app.hasModifyPermissionForCurrentFile()){
      this.pdfButton.show()
      this.saveButton.show()
      this.createFileButton.show()
    }
    else{
      this.pdfButton.hide()
      this.saveButton.hide()
      this.createFileButton.hide()
    }

    if (event.getStack().canUndo()){
      $("#editorFileSave div").addClass("highlight")
      this.app.hasUnsavedChanges = true
    }

  }
}
