import GenericApplication from "../../common/js/Application"
import toast from "../../common/js/toast"
import checkElement from "../../common/js/checkElement"
import notFoundDialog from "../../common/js/NotFoundDialog"

import Toolbar from "./Toolbar"
import Palette from "./Palette"
import View from "./View"
import conf from "./Configuration"
import reader from "./io/Reader"
import fileCreate from "./dialog/FileCreate"
import fileSave from "./dialog/FileSave"
import progress from "./dialog/Progress"
import shareDialog from "../../common/js/ShareDialog"
import confirmDialog from "../../common/js/ConfirmDialog"

import storageFactory from '../../common/js/BackendStorage'
let storage = storageFactory(conf)

class Application extends GenericApplication{

  constructor() {
    super("brains")
  }

  init(permissions) {
    super.init(permissions, conf)
    return new Promise( (resolve, reject)=>{

      this.palette = new Palette(permissions)
      this.view = new View("draw2dCanvas", permissions)
      this.toolbar = new Toolbar(this, this.view, "#editor .toolbar", permissions)

      this.view.getCommandStack().addEventListener(this)
  
      // check if the user has added a "file" parameter. In this case we load the shape from
      // the draw2d.shape github repository
      //
      let user   = this.getParam("user")
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
      else {
        this.showWelcomeMessage("guides/intro.brain")
      }
  
      resolve(this)
    })
  }

  fileShare() {
    let filePath = this.currentFile.name
    let scope = this.currentFile.scope
    return new Promise( (resolve, reject)=>{
      return app.fileSave(t("message.save_before_share")).then(resolve, reject)
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
        return fileCreate.show(this.currentFile)
      }
      return this.showLoginHint()
    })
    .then(()=>{
      this.hasUnsavedChanges = false
      toast(t("common:message.created"))
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions[this.objectType], this.currentFile)
    })
    .catch( (error)=>{
      console.log(error)

    })
  }

  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()
    this.currentFile = { name: name??"MyNewCircuit", scope: scope??"user" }
    this.view.clear()
    this.view.getCommandStack().markSaveLocation()
    this.view.centerDocument()
  }

  fileSave(description=""){
    return new Promise( (resolve, reject)=>{
      // if the user didn't has the access to write "global" files, the scope of the file is changed
      // // from "global" to "user". In fact the user creates a copy in his/her own repository.
      //
      if(this.permissions[this.objectType ].global.update===false){
        this.currentFile.scope = "user"
      }

      if (this.permissions[this.objectType].create && this.permissions[this.objectType].update) {
        // allow the user to enter/change the file name....
        return fileSave.show(this.currentFile, this.view, description).then(resolve, reject)
      }
      reject(new Error("No permission to save files"))
    })
    .then( ()=>{
      this.hasUnsavedChanges = false
      toast(t("common:message.saved"))
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions[this.objectType], this.currentFile)
    })
    .catch( err => {
      console.log(err)
    })
  }


  load(name, scope) {
    let url = conf.backend[scope].get(name)
    this.view.clear()
    $("#leftTabStrip .editor").click()
    this.hideWelcomeMessage()
    return storage.loadUrl(url)
      .then((content) => {
        this.view.clear()
        progress.show()
        return reader.unmarshal(this.view, content, progress.update.bind(progress)).then( ()=>{
          progress.hide()
          this.view.getCommandStack().markSaveLocation()
          this.view.centerDocument()
          this.hasUnsavedChanges = false
          $("#editorFileSave div").removeClass("highlight")
          this.currentFile = { name, scope}
 
          return content
        })
      })
      .then( ()=>{
        history.pushState({
          id: 'editor',
          scope: scope,
          file: name
        }, conf.application+' | ' + name, window.location.href.split('?')[0] + '?'+scope+'=' + name)
      })
      .then( ()=>{
        /** shared files do not provide any guided tours */
        if(scope!=="shared"){
          // check if a tutorial exists for the named file and load/activate them
          //
          storage.loadUrl(url.replace(conf.fileSuffix, ".guide"))
            .then(guide => {
              if (typeof guide === "string") {
                guide = JSON.parse(guide)
              }
              $(guide.screen).click()
              checkElement("#paletteElementsScroll").then(() => {
                new Anno(guide.steps).show()
              })
            })
            .catch(error => {
              // ignore 404 HTTP error silently for "guide" files
            })
        }
      })
      .catch( error => {
        console.log(error)
        notFoundDialog.show(name)
      })
  }
}

let app = new Application()
export default app
