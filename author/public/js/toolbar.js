import commandStack from "./commands/CommandStack"

import conf from "./Configuration"
let storage = require('../../common/js/BackendStorage').default(conf)

import exportModePrompt from "./dialog/SelectExportMode"

export default class Toolbar {

  constructor(app, view, elementId, permissions) {
    this.html = $(elementId)
    this.app = app
    this.view = view
    this.permissions = permissions

    commandStack.off(this).on("change", this)

    this.createFileButton = $("#editorFileCreate")
    this.createFileButton.off("click").on("click", () => {
      app.fileCreateNew()
    })

    this.saveButton = $("#editorFileSave")
    this.saveButton.off("click").on("click", () => {
      app.fileSave()
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
          t("message.chapter_to_clipboard"), 
          { position: "bottom left",
          gap: 20,
          showDuration: 40,
          arrowShow: false,
          className: 'info',
          autoHideDelay: 2000,
        });
      })
    })

    this.shareButton = $("#editorFileShare")
    if(permissions.featureset.share) {
      this.shareButton.off("click").on("click", () => {
        app.fileShare()
      })
    }
    else{
      this.shareButton.remove()
    }


    this.pdfButton = $("#editorFileToPDF")
    if (permissions.sheets.pdf || permissions.sheets.global.pdf) {
      this.pdfButton.off("click").on("click", () => {
        this.onPDFExport()
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

    this.stackChanged()
  }

  onPDFExport() {
    let file = app.currentFile
    Promise.resolve()
      .then(() => {
        if( !((file.scope==="global" && this.permissions.sheets.global.update === true) ||
            (file.scope==="user"   && this.permissions.sheets.update === true ))){
              throw new Error("no permission to export")
        }
        return true
      })
      .then(() => {
        if(this.app.hasUnsavedChanges){
          return app.fileSave(t("message.save_before_pdf"))
        }
        return true
      })
      .then(() => {
        if(this.app.getDocument().hasLearningContent()){
          return exportModePrompt.show()
        }
        return "worksheet"
      })
      .then((mode) => {
        if(file.scope === "global"){
          return {scope: "global", file: file.name, mode: mode}
        }
        return storage.shareFile(file.name,file.scope)
          .then( (response)=>{
            return {scope: "sha", file: response.data.filePath, mode: mode}
          })
      })
      .then(({scope, file, mode}) => {        
        window.open(`../sheets/pdf?${scope}=${file}&mode=${mode}`, "__blank")
      })
      .catch((error)=>{
        console.log(error)
      })
  }


  stackChanged(event) {
    this.pdfButton.hide()
    this.shareButton.hide()
    this.copyButton.hide()
    
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
      this.copyButton.show()
    }
    else{
      $("#editUndo, #editRedo").hide()
      this.pdfButton.hide()
      this.saveButton.hide()
    }
  }
}
