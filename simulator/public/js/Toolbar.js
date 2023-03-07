
import conf from "./Configuration"
let storage = require('../../common/js/BackendStorage').default(conf)


export default class Toolbar {

  constructor(app, view, elementId, permissions) {
    this.html = $(elementId)
    this.app = app
    this.view = view
    this.permissions = permissions

    
    // register this class as event listener for the canvas
    // CommandStack. This is required to update the state of
    // the Undo/Redo Buttons.
    //
    view.getCommandStack().on("change", this)

    if(permissions[this.app.objectType].update || permissions[this.app.objectType].create) {
        $("#editorFileCreate").on("click",  () => { this.app.fileCreateNew() })
        $("#editorFileSave").on("click",    () => { this.app.fileSave() })
    }
    else {
        $("#editorFileCreate").remove()
        $("#editorFileSave").remove()
    }

    if(permissions.featureset.share) {
        $("#editorFileShare").on("click", () => { this.app.fileShare()})
    }
    else{
        $("#editorFileShare").remove()
    }
  }


  stackChanged(event) {
  }
}
