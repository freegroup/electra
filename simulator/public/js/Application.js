import Userinfo from "../../common/js/Userinfo"
import toast from "../../common/js/toast"
import checkElement from "../../common/js/checkElement"
import notFoundDialog from "../../common/js/NotFoundDialog"

import Palette from "./Palette"
import View from "./View"
import Files from "../../common/js/FilesScreen"
import conf from "./Configuration"
import reader from "./io/Reader"
import fileSave from "./dialog/FileSave"
import progress from "./dialog/Progress"
import shareDialog from "../../common/js/LinkShareDialog";
import AuthorPage from "../../common/js/AuthorPage";
import AppSwitch from "../../common/js/AppSwitch";
import LngSwitch from "../../common/js/LngSwitch"
import storageFactory from '../../common/js/BackendStorage'
let storage = storageFactory(conf)


class Application {

  constructor() {
  }

  init(permissions) {
    this.currentFile = { name:"NewDocument"+conf.fileSuffix, scope:"user"}
    this.permissions = permissions
    this.hasUnsavedChanges = false
    this.palette = new Palette(permissions)
    this.view = new View("draw2dCanvas", permissions)
    this.filePane = new Files(this, conf, permissions.brains)

    this.userinfo = new Userinfo(permissions)
    this.indexPane = new AuthorPage("#home", "readme/en/simulator/Readme.sheet")
    this.appSwitch = new AppSwitch(permissions)
    this.lngSwitch = new LngSwitch(permissions)

    this.indexPane.render()

    // Show the user an alert if there are unsaved changes
    //
    window.onbeforeunload = ()=> {
      return this.hasUnsavedChanges?  "The changes you made will be lost if you navigate away from this page": undefined;
    }

    this.view.getCommandStack().addEventListener(this)


    if(permissions.brains.update || permissions.brains.create) {
      $("#editorFileSave").on("click", () => {
        this.fileSave()
      })
    }
    else{
      $("#editorFileSave").remove()
    }


    this.shareButton = $("#editorFileShare")
    if(permissions.featureset.share) {
      this.shareButton.on("click", () => {
        this.shareButton.tooltip("hide")
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

    // listen on the history object to load files
    //
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.id === 'editor') {
        let scope = event.state.scope
        this.load(event.state.file, scope)
      }
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


  fileShare() {
    let filePath = this.currentFile.name
    let scope = this.currentFile.scope
    storage.shareFile(filePath,scope)
      .then(( response) => {
        let file = response.data.filePath
        shareDialog.show(file)
      })
  }

  fileSave(){
    let callback = () => {
      this.hasUnsavedChanges = false
      toast("Saved")
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions.brains, this.currentFile)
    }
    // if the user didn't has the access to write "global" files, the scope of the file is changed
    // // from "global" to "user". In fact the user creates a copy in his/her own repository.
    //
    if(this.permissions.brains.global.update ===false){
      this.currentFile.scope = "user"
    }

    if (this.permissions.brains.create && this.permissions.brains.update) {
      // allow the user to enter a file name....
      fileSave.show(this.currentFile, this.view, callback)
    } else if (this.permissions.brains.create) {
      // just save the file with a generated filename. It is a codepen-like modus
      fileSave.save(this.currentFile, this.view, callback)
    }
  }

  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()

    this.view.clear()

    if (name) {
      this.currentFile = { name, scope }
    } else {
      this.currentFile = { name: "MyNewBrain" , scope:"user"}
    }
    this.view.centerDocument()
  }

  stackChanged(event) {
    if (event.isPreChangeEvent()) {
      return // silently
    }
    if (event.getStack().canUndo()){
      $("#editorFileSave div").addClass("highlight")
      this.hasUnsavedChanges = true
    }
  }
}

let app = new Application()
export default app
