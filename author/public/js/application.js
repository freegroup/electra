import GenericApplication from "../../common/js/Application"
import shareDialog from "../../common/js/ShareDialog"
import confirmDialog from "../../common/js/ConfirmDialog"
import toast from "../../common/js/toast"

import Toolbar from "./Toolbar"
import View from "./view"
import fileSave from "./dialog/FileSave"
import fileCreate from "./dialog/FileCreate"
import conf from "./Configuration"
import Document from "./model/document"
import commandStack from "./commands/CommandStack"

import storageFactory from '../../common/js/BackendStorage'
let storage = storageFactory(conf)

class Application extends GenericApplication{
  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor() {
    super("sheets")
  }

  init(permissions) {
    super.init(permissions, conf)
    $("body")
      .on( "focus", ".mousetrap-pause", Mousetrap.pause)
      .on( "blur", ".mousetrap-pause",  Mousetrap.unpause)

    this.document = null
    this.view = new View(this, "#editor .content", permissions)
    this.toolbar = new Toolbar(this, this.view, ".toolbar", permissions)

    commandStack.on("change", this)

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
        fileSave.show(this.currentFile, this.document, description).then(resolve, reject)
      } else if (this.permissions.sheets.create) {
        // just save the file with a generated filename. It is a codepen-like modus
        fileSave.save(this.currentFile, this.document, description).then(resolve, reject)
      }
      else{
        return reject()
      }
    }).then(()=>{
      this.hasUnsavedChanges = false
      toast(t("common:message.saved"))
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions.sheets, this.currentFile)
    })
  }


  fileCreateNew(){
    return new Promise((resolve, reject)=>{
      if (this.hasUnsavedChanges === true){
         return confirmDialog.show(t("common:message.unsaved_changes")).then(resolve, reject)
      }
      return resolve()
    })
    .then(()=>{
      this.fileNew()
      return fileCreate.show(this.currentFile, this.document)
    })
    .then(()=>{
      this.hasUnsavedChanges = false
      toast(t("common:message.created"))
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions.brains, this.currentFile)
    })
    .catch( (error)=>{
      console.log(error)
    })
  }


  fileShare() {
    let filePath = this.currentFile.name
    let scope = this.currentFile.scope
    return new Promise( (resolve, reject)=>{
      if (this.hasUnsavedChanges) {
        return app.fileSave(t("message.save_before_share")).then(resolve, reject)
      }
      resolve()
    })
    .then( ()=>{
      return storage.shareFile(filePath,scope)
    })
    .then((response) => {
      return shareDialog.show(response.data.filePath)
    })
    .catch (error => {
      console.log(error)
    })
  }

  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()
    this.currentFile = { name: name??"MyNewDocument", scope: scope??"user" }
    this.setDocument(new Document(), 0)
    commandStack.markSaveLocation()
  }

  load(name, scope){
    let url = conf.backend[scope].get(name)
    $("#leftTabStrip .editor").click()
    return storage.loadUrl(url)
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
}


let app = new Application()
export default app
