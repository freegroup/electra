import GenericApplication from "../../common/js/Application"
import toast from "../../common/js/toast"
import checkElement from "../../common/js/checkElement"
import notFoundDialog from "../../common/js/NotFoundDialog"

import Palette from "./Palette"
import View from "./View"
import conf from "./Configuration"
import reader from "./io/Reader"
import fileCreate from "./dialog/FileCreate"
import fileSave from "./dialog/FileSave"
import progress from "./dialog/Progress"
import shareDialog from "../../common/js/ShareDialog"
import confirmDialog from "../../common/js/ConfirmDialog"
import AuthorPage from "../../common/js/AuthorPage"
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

  
      this.view.getCommandStack().addEventListener(this)
  
      if(permissions.brains.update || permissions.brains.create) {
        $("#editorFileCreate").on("click",  () => { this.fileCreateNew() })
        $("#editorFileSave").on("click",    () => { this.fileSave() })
      }
      else{
        $("#editorFileCreate").remove()
        $("#editorFileSave").remove()
      }
  
  
      this.shareButton = $("#editorFileShare")
      if(permissions.featureset.share) {
        this.shareButton.on("click", () => {
          app.fileShare()
        })
      }
      else{
        this.shareButton.remove()
      }
  
  
      // check if the user has added a "file" parameter. In this case we load the shape from
      // the draw2d.shape github repository
      //
      let user = this.getParam("user")
      let global = this.getParam("global")
      let shared = this.getParam("shared")
      if (user) {
        $("#leftTabStrip .editor").click()
        this.load(user, "user")
      }
      // check if the user has added a "file" parameter. In this case we load the shape from
      // the draw2d.shape github repository
      //
      else if (global) {
        $("#leftTabStrip .editor").click()
        this.load(global, "global")
      }
      else if (shared) {
        $("#leftTabStrip .editor").click()
        this.load(shared, "shared")
      }
      else {
        this.fileNew()
      }
  
      resolve(this)
    })
  }

  load(name, scope) {
    let url = conf.backend[scope].get(name)
    this.view.clear()
    $("#leftTabStrip .editor").click()
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
                // ignore 404 HTTP error silently
              })
          }
          return content
        })
      })
      .catch (exc => {
        notFoundDialog.show(name)
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
      return fileCreate.show(this.currentFile)
    })
    .then(()=>{
      this.hasUnsavedChanges = false
      toast(t("common:message.created"))
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions.brains, this.currentFile)
    })
    .catch( ()=>{
      // ignore
    })
  }

  fileSave(){
    return new Promise( (resolve, reject)=>{
      // if the user didn't has the access to write "global" files, the scope of the file is changed
      // // from "global" to "user". In fact the user creates a copy in his/her own repository.
      //
      if(this.permissions.brains.global.update===false){
        this.currentFile.scope = "user"
      }

      if (this.permissions.brains.create && this.permissions.brains.update) {
        // allow the user to enter/change a file name....
        //
        return fileSave.show(this.currentFile, this.view).then(resolve, reject)
      } else if (this.permissions.brains.create) {
        // just save the file with a generated filename. It is a codepen-like modus
        // The callback of the REST-save function contains the new generated filename
        //
        return fileSave.save(this.currentFile, this.view).then(resolve, reject)
      }
      return reject()
    })
    .then( ()=>{
      this.hasUnsavedChanges = false
      toast(t("common:message.saved"))
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions.brains, this.currentFile)
    })
    .catch( err => {
      console.log(err)
    })
  }

  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()
    this.view.clear()
    this.currentFile = { name: name??"MyNewCircuit", scope: scope??"user" }
    this.view.centerDocument()
  }
}

let app = new Application()
export default app
