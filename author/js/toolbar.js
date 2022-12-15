import commandStack from "./commands/CommandStack"

import conf from "./configuration"
let storage = require('../common/js/BackendStorage').default(conf)

export default class Toolbar {

  constructor(app, view, elementId, permissions) {
    this.html = $(elementId)
    this.app = app
    this.view = view
    this.permissions = permissions

    commandStack.off(this).on("change", this)

    this.saveButton = $("#editorFileSave")
    this.saveButton.off("click").on("click", () => {
      this.saveButton.tooltip("hide")
      app.fileSave()
    })

    this.shareButton = $("#editorFileShare")
    this.shareButton.off("click").on("click", () => {
      this.shareButton.tooltip("hide")
      if (this.app.hasUnsavedChanges) {
        // File must be saved before sharing
        app.fileSave("File must be saved before you can share it").then(() => {
          app.fileShare()
        })
      } else {
        app.fileShare()
      }
    })

    this.pdfButton = $("#editorFileToPDF")
    if (permissions.sheets.pdf || permissions.sheets.global.pdf) {
      this.pdfButton.off("click").on("click", () => {
        let file = app.currentFile
        if (this.app.hasUnsavedChanges
          && ((file.scope === "global" && permissions.sheets.global.update === true)
            ||
            (file.scope === "user" && permissions.sheets.update === true))) {
          // File must be save before sharing
          app.fileSave("File must be saved before you can export it to PDF")
          .then( ()=>{
            return storage.shareFile(file.name,file.scope)
          })
          .then((response) => {
            let filePath = response.data.filePath
            window.open(`../sheets/pdf?sha=${filePath}`, "__blank")
          })
        } else {
          storage.shareFile(file.name,file.scope)
          .then((response)=>{
            let filePath = response.data.filePath
            window.open(`../sheets/pdf?sha=${filePath}`, "__blank")
          })
        }
      })
    } else {
      this.pdfButton.hide()
    }

    // enable the tooltip for all buttons
    //
    $('*[data-toggle="tooltip"]').tooltip({
      placement: "bottom",
      container: "body",
      delay: {show: 1000, hide: 10},
      html: true
    })

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

    this.stackChanged()
  }

  stackChanged(event) {
    this.pdfButton.hide()
    this.shareButton.hide()
    
    // check the permission if the current file is "user" scope
    if(this.app.getDocument() !==null) {
      if (this.app.currentFile.scope === "user") {
        if (this.permissions.sheets.pdf === true) {
          this.pdfButton.show()
        }
      } else if (this.app.currentFile.scope === "global") {
        if (this.permissions.sheets.global.pdf === true) {
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
    }
    else{
      $("#editUndo, #editRedo").hide()
      this.pdfButton.hide()
      this.saveButton.hide()
    }
  }

}
