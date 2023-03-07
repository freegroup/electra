import GenericApplication from "../../common/js/Application"
import shareDialog from "../../common/js/ShareDialog"
import confirmDialog from "../../common/js/ConfirmDialog"
import notFoundDialog from "../../common/js/NotFoundDialog"
import toast from "../../common/js/toast"
import exportModePrompt from "./dialog/SelectExportMode"

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
    return new Promise( (resolve, reject) => {

      this.document = null

      this.view    = new View(this, "#editor .content", permissions)
      this.toolbar = new Toolbar(this, this.view, ".toolbar", permissions)

      let user = this.getParam("user")
      let global = this.getParam("global")
      let shared = this.getParam("shared")
      if (user) {
        this.load(user, "user")
      }
      else if (global) {
        this.load(global, "global")
      }
      else if (shared) {
        this.load(shared, "shared")
      }
      else{
        this.showWelcomeMessage("/basic/math/binary-addition.sheet")
      }
      resolve(this)
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


  fileCreateNew(){
    return new Promise((resolve, reject)=>{
      if (this.hasUnsavedChanges === true){
         return confirmDialog.show(t("common:message.unsaved_changes")).then(resolve, reject)
      }
      return resolve()
    })
    .then(()=>{
      this.fileNew()
      if(this.permissions[this.objectType ].create && this.permissions[this.objectType ].update){
        return fileCreate.show(this.currentFile, this.document)
      }
      return this.showLoginHint()
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


  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()
    this.currentFile = { name: name??"MyNewDocument", scope: scope??"user" }
    this.setDocument(new Document(), 0)
    commandStack.markSaveLocation()
  }

  fileSave(description="") {
    this.view.onCommitEdit()
    return new Promise((resolve, reject) => { 
      // if the user didn't has the access to write "global" files, the scope of the file is changed
      // // from "global" to "user". In fact the user creates a copy in his/her own repository.
      //
      if(this.permissions[this.objectType].global.update===false){
        this.currentFile.scope = "user"
      }
  
      if (this.permissions[this.objectType].create && this.permissions[this.objectType].update) {
        // allow the user to enter/change the file name....
        return fileSave.show(this.currentFile, this.document, description).then(resolve, reject)
      }
      reject(new Error("No permission to save files"))
    })
    .then(()=>{
      this.hasUnsavedChanges = false
      toast(t("common:message.saved"))
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions[this.objectType], this.currentFile)
    })
    .catch( err => {
      console.log(err)
    })
  }

  onPDFExport() {
    let file = this.currentFile
    Promise.resolve()
      .then(() => {
        if( !((file.scope==="global" && this.permissions[this.objectType].global.update === true) ||
            (file.scope==="user"   && this.permissions[this.objectType].update === true ))){
              throw new Error("no permission to export")
        }
        return true
      })
      .then(() => {
        if(this.hasUnsavedChanges){
          return this.fileSave(t("message.save_before_pdf"))
        }
        return true
      })
      .then(() => {
        if(this.getDocument().hasLearningContent()){
          return exportModePrompt.show()
        }
        return "worksheet"
      })
      .then((mode) => {
        if(file.scope === "global"){
          return {scope: "global", file: file.name, mode: mode}
        }
        return storage.shareFile(file.name, file.scope).then( (response)=>{
          return {scope: "sha", file: response.data.filePath, mode: mode}
        })
      })
      .then(({scope, file, mode}) => {        
        window.open(`../sheets/pdf?${scope}=${file}&mode=${mode}`, "_blank")
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  load(name, scope){
    let url = conf.backend[scope].get(name)
    $("#leftTabStrip .editor").click()
    this.hideWelcomeMessage()
    return storage.loadUrl(url)
      .then((content) => {
        this.currentFile = { name, scope}
        this.setDocument(new Document(content),0)
        commandStack.markSaveLocation()
        return content
      })
      .then( ()=>{
        history.pushState({
          id: 'editor',
          scope: scope,
          file: name
        }, conf.application+' | ' + name, window.location.href.split('?')[0] + '?'+scope+'=' + name)
      })
      .catch( error => {
        console.log(error)
        notFoundDialog.show(name)
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
