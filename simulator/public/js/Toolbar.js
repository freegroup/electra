import webUSBHelpDialog from "./dialog/WebUSBHelpDialog"

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

    if(permissions[this.app.objectType].global.update || permissions[this.app.objectType].global.create ||
       permissions[this.app.objectType].update        || permissions[this.app.objectType].create) {
        $("#editorFileCreate").on("click",  () => {this.app.fileCreateNew()})
        $("#editorFileSave").on("click",    () => {this.app.fileSave()})
    }
    else {
        $("#editorFileCreate").remove()
        $("#editorFileSave").remove()
    }

    if(permissions.featureset.share) {
        $("#editorFileShare").on("click", () => {this.app.fileShare()})
    }
    else{
        $("#editorFileShare").remove()
    }

    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    let isHTTPS = location.protocol === 'https:'
    let isLocalhost = location.hostname ==="localhost"
    if (isChrome && (isHTTPS || isLocalhost)) {
      $('#statusWebUSB').on("click", () => {
        if (hardware.arduino.connected) {
          hardware.arduino.disconnect()
        } else {
          hardware.arduino.connect()
        }
      })
    } else {
      $('#statusWebUSB').addClass("disabled")
    }
    $("#statusWebUSB .help-link").on("click", () => webUSBHelpDialog.show())

    // Register a Selection listener for the state handling
    // of the delete Button
    //
    this.view.on("select", (emitter, event) => {
        $("#editDelete").removeClass("disabled")
    })
  
    this.view.on("unselect", (emitter, event) => {
        $("#editDelete").addClass("disabled")
    })

    $(".toolbar").on("click", "#editUndo:not(.disabled)", () => {
        this.view.getCommandStack().undo()
    })
  
    $(".toolbar").on("click", "#editRedo:not(.disabled)", () => {
        this.view.getCommandStack().redo()
    })
  
    $(".toolbar").on("click", "#editorFullscreen:not(.disabled)", () => {
        this.view.toggleFullScreen()
    })
  
    $("#simulationStartStop").on("click", () => {
        this.view.simulationToggle()
    })

    $(".toolbar").on("click", "#editDelete:not(.disabled)", this.view.deleteSelection.bind(this.view))
    Mousetrap.bindGlobal(['del', 'backspace'], this.view.deleteSelection.bind(this.view))
  }


  stackChanged(event) {
  }
}
