import shareDialog from "../common/js/LinkShareDialog"
import AuthorPage from "../common/js/AuthorPage"
import Files from "../common/js/FilesScreen"
import Userinfo from "../common/js/Userinfo"
import AppSwitch from "../common/js/AppSwitch"
import toast from "../common/js/toast"

import Toolbar from "./toolbar"
import View from "./view"
import fileSave from "./dialog/FileSave"
import conf from "./configuration"
import Document from "./model/document"
import commandStack from "./commands/CommandStack"

let storage = require('../common/js/BackendStorage').default(conf)

class Application {
  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor() {
  }

  init(permissions) {
    $("body")
      .on( "focus", ".mousetrap-pause", Mousetrap.pause)
      .on( "blur", ".mousetrap-pause",  Mousetrap.unpause)

    this.hasUnsavedChanges = false
    this.permissions = permissions
    this.document = null
    this.currentFile = { name:"NewDocument"+conf.fileSuffix, scope:"user"}
    this.storage = storage
    this.view = new View(this, "#editor .content", permissions)
    this.filePane = new Files(this, conf, permissions.sheets)
    this.indexPane = new AuthorPage("#home", "/readme/en/author/README.sheet")
    this.toolbar = new Toolbar(this, this.view, ".toolbar", permissions)
    this.userinfo = new Userinfo(permissions, conf)
    this.appSwitch = new AppSwitch(permissions, conf)

    commandStack.on("change", this)

    this.indexPane.render()

    // Show the user an alert if there are unsaved changes
    //
    window.onbeforeunload = ()=> {
      return this.hasUnsavedChanges?  "The changes you made will be lost if you navigate away from this page": undefined;
    }

    let user = this.getParam("user")
    let global = this.getParam("global")
    let shared = this.getParam("shared")
    if (user) {
      this.load(user, "user")
    }
    // check if the user has added a "file" parameter. In this case we load the shape from
    // the draw2d.shape github repository
    //
    else if (global) {
      this.load(global, "global")
    }
    else if (shared) {
      this.load(shared, "shared")
    }

    // listen on the history object to load files
    //
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.id === 'editor') {
        // Render new content for the homepage
        this.load(event.state.file, event.state.scope)
      }
    })
  }

  getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
    let regexS = "[\\?&]" + name + "=([^&#]*)"
    let regex = new RegExp(regexS)
    let results = regex.exec(window.location.href)
    // the param isn't part of the normal URL pattern...
    //
    if (results === null) {
      // maybe it is part in the hash.
      //
      regexS = "[\\#]" + name + "=([^&#]*)"
      regex = new RegExp(regexS)
      results = regex.exec(window.location.hash)
      if (results === null) {
        return null
      }
    }
    return results[1]
  }


  fileSave(description="") {
    return new Promise((resolve, reject) => { 
  
      // if the user didn't has the access to write "global" files, the scope of the file is changed
      // // from "global" to "user". In fact the user creates a copy in his/her own repository.
      //
      if(this.permissions.sheets.global.update ===false){
        this.currentFile.scope = "user"
      }
  
      this.view.onCommitEdit()
      if (this.permissions.sheets.create && this.permissions.sheets.update) {
        // allow the user to enter/change the file name....
        fileSave.show(this.currentFile, this.storage, this.document, description).then(resolve).catch(reject)
      } else if (this.permissions.sheets.create) {
        // just save the file with a generated filename. It is a codepen-like modus
        fileSave.save(this.currentFile, this.storage, this.document, description).then(resolve).catch(reject)
      }
      else{
        return reject()
      }
    }).then(()=>{
      this.hasUnsavedChanges = false
      toast("Saved")
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions.sheets, this.currentFile)
    })
  }


  fileShare() {
    let filePath = this.currentFile.name
    let scope = this.currentFile.scope
    storage.shareFile(filePath,scope)
      .then(( response) => {
        let file = response.data.filePath
        shareDialog.show(file)
      })
  }

  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()
    this.currentFile = { name, scope }
    this.setDocument(new Document(), 0)
    commandStack.markSaveLocation()
    let section = this.view.addMarkdown(0)
    this.view.onSelect(section)
    this.view.onEdit(section)
  }

  load(name, scope){
    let url = conf.backend[scope].get(name)
    $("#leftTabStrip .editor").click()
    return this.storage.loadUrl(url)
      .then((content) => {
        this.currentFile = { name, scope}
        this.setDocument(new Document(content),0)
        commandStack.markSaveLocation()
        return content
      })
  }

  setDocument(document, pageIndex){
    this.document = document
    // the "setDocument" is used by the CommandStack for undo/redo
    // therefore a "markSaveLocation" is a bad idea in this method
    // commandStack.markSaveLocation()
    this.view.onCancelEdit()
    this.view.setPage(this.document.get(pageIndex || 0))
  }

  getDocument(){
    return this.document
  }

  stackChanged(event) {
    if (event.getStack().canUndo()){
      $("#editorFileSave div").addClass("highlight")
      this.hasUnsavedChanges = true
    }
  }

  hasModifyPermissionForCurrentFile(){
    let scope = this.currentFile.scope
    let document = this.getDocument()

    return (
      document !== null
      &&
      (    (scope === "global" && (this.permissions.sheets.global.update || this.permissions.sheets.global.create))
        || (scope === "user"   && (this.permissions.sheets.update        || this.permissions.sheets.create       ))
      )
    )
  }
}


let app = new Application()
export default app
