import Files from "../common/js/FilesScreen"
import Userinfo from "../common/js/Userinfo"
import AuthorPage from "../common/js/AuthorPage"
import AppSwitch from "../common/js/AppSwitch"
import toast from "../common/js/toast"

import View from "./View"
import Toolbar from "./Toolbar"
import Layer from "./Layer"
import FilterPane from "./FilterPane"
import SelectionToolPolicy from './policy/SelectionToolPolicy'
import conf from "./Configuration"
import fileSave from "./dialog/FileSave"

let storage = require('../common/js/BackendStorage').default(conf)

/**
 * wait asyn that an DOM element is present
 * Usage: checkElement("<selector>").then(function(){alert("element found")})
 *
 * @returns {Promise<any>}
 */
function rafAsync() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve); //faster than set time out
  });
}
function checkElement(selector) {
  if (document.querySelector(selector) === null) {
    return rafAsync().then(() => checkElement(selector));
  } else {
    return Promise.resolve(true);
  }
}


class Application {
  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor() {
  }

  init(permissions){
    this.permissions = permissions
    this.hasUnsavedChanges = false
    this.currentFile = { name: conf.fileNew + conf.fileSuffix, scope: "user"}
    this.documentConfigurationTempl = {
      baseClass: "draw2d.SetFigure",
      code: $("#shape-edit-template").text().trim()
    }

    // Show the user an alert if there are unsaved changes
    //
    window.onbeforeunload = ()=> {
      return this.hasUnsavedChanges?  "The changes you made will be lost if you navigate away from this page": undefined;
    }

    this.localStorage = []
    try {
      if ('localStorage' in window && window.localStorage !== null) {
        this.localStorage = localStorage
      }
    } catch (e) {

    }

    $( "body" )
      .delegate( ".mousetrap-pause", "focus", function() {
        Mousetrap.pause()
      })
      .delegate(".mousetrap-pause", "blur", function (){
        Mousetrap.unpause()
      });

    // automatic add the configuration to the very first shape
    // in the document as userData
    //
    this.documentConfiguration = $.extend({}, this.documentConfigurationTempl)

    this.storage = storage
    this.view = new View(this, "canvas", permissions)
    this.toolbar = new Toolbar(this, "#editor .toolbar", this.view, permissions)
    this.layer = new Layer(this, "layer_elements", this.view, permissions)
    this.filter = new FilterPane(this, "#filter .filter_actions", this.view, permissions)
    this.userinfo = new Userinfo(permissions, conf)
    this.filePane = new Files(this, conf, permissions.shapes)
    this.indexPane = new AuthorPage("#home", "readme/en/designer/Readme.sheet")
    this.appSwitch = new AppSwitch(permissions, conf)

    this.indexPane.render()
    this.view.installEditPolicy(new SelectionToolPolicy())

    this.view.getCommandStack().addEventListener(this)

    // check if the user has added a "file" parameter. In this case we load the shape from
    // the draw2d.shape github repository
    //
    let user = this.getParam("user")
    let global = this.getParam("global")
    if (user) {
      this.load(user, "user")
    }
    else if (global) {
      this.load(global, "global")
    }
    else {
      this.view.showWelcomeMessage()
    }

    // listen on the history object to load files
    //
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.id === 'editor') {
        let scope = event.state.scope
        let url = conf.backend[scope].get(event.state.file)
        this.load(url, scope)
      }
    })

    // check if the user has added a "file" parameter. In this case we load the shape from
    // the draw2d.shape github repository
    //
    let tutorial = this.getParam("tutorial")
    if(tutorial) {
      this.checkForTutorialMode()
    }

    inlineSVG.init()
  }

  checkForTutorialMode() {
    let tutorial = this.getParam("tutorial")
    if (!tutorial || tutorial === '') {
      return
    }

    switch (tutorial) {
      case "markdown":
        checkElement("#editDoc").then( ()=>{
          new Anno([
            {
              target: '#editDoc',
              content: 'Click here to edit the documentation of the shape.',
              position: 'left'
            },
            {
              target: '#editorFileSave',
              content: "..and don't forget to save your changes afterwards.",
              position: 'right'
            },
          ]).show()
        })
        break
      case "code":
        checkElement("#editCode").then( ()=>{
          new Anno([
            {
              target: '#editCode',
              content: 'Click here to edit the code of the shape.',
              position: 'left'
            },
            {
              target: '#editTest',
              content: '...you can test the shape here...',
              position: 'left'
            },
            {
              target: '#editorFileSave',
              content: "..and don't forget to save your changes afterwards.",
              position: 'right'
            },
          ]).show()
        })
        break
      case "design":
        checkElement("#tool_shape").then( ()=>{
          new Anno([
            {
              target: '#tool_shape',
              content: 'Add rect, circles or lines to the shape..',
              position: 'left'
            },
            {
              target: '#editTest',
              content: '...you preview and can test the shape here...',
              position: 'left'
            },
            {
              target: '#editorFileSave',
              content: "..and don't forget to save your changes afterwards.",
              position: 'right'
            },
          ]).show()
        })
        break
      default:
        break
    }
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


  load(name, scope){
    let url = conf.backend[scope].get(name)
    this.view.reset()
    $("#leftTabStrip .editor").click()

    return this.storage.loadUrl(url)
      .then((content) => {
        if (typeof content === "string"){
          content = JSON.parse(content)
        }
        this.view.reset()
        let reader = new draw2d.io.json.Reader()
        reader.unmarshal(this.view, content.draw2d || content)
        this.getConfiguration()
        this.view.getCommandStack().markSaveLocation()
        this.view.centerDocument()
        this.hasUnsavedChanges = false
        $("#editorFileSave div").removeClass("highlight")
        this.currentFile = { name, scope}

        return content
      })
  }

  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()
    this.view.reset()
    this.documentConfiguration = $.extend({}, this.documentConfigurationTempl)
    if (name) {
      this.currentFile = { name, scope }
    } else {
      // currently there is no support for "user" defined shapes. scope should be always "global"
      this.currentFile = { name: conf.fileNew , scope:"global"}
    }
    this.view.getCommandStack().markSaveLocation()
    this.view.centerDocument()
  }

  fileSave() {
    this.setConfiguration()
    fileSave.show(this.currentFile, this.storage,this.view)
      .then( (filePath) => {
        this.hasUnsavedChanges = false
        toast("Saved")
        $("#editorFileSave div").removeClass("highlight")
        this.filePane.refresh(conf, this.permissions.shapes, this.currentFile)
      })
  }


  getConfiguration(key) {
    let figures = this.view.getExtFigures()
    if (figures.getSize() > 0) {
      this.documentConfiguration = $.extend({}, this.documentConfiguration, figures.first().getUserData())
    }

    function pick (obj, var_keys) {
      let keys = typeof arguments[1] !== 'string' ? arguments[1] : Array.prototype.slice.call(arguments, 1)
      let out = {}, key
      for (key in keys) {
        if (typeof obj[key] !== "undefined")
          out[key] = obj[key]
      }
      return out
    }

    if (key) {
      return this.documentConfiguration[key]
    }
    return pick(this.documentConfiguration, "baseClass", "code", "markdown")
  }

  setConfiguration(conf) {
    this.documentConfiguration = $.extend({}, this.documentConfiguration, conf)
    let figures = this.view.getExtFigures()
    if (figures.getSize() > 0) {
      let userData = figures.first().attr("userData")
      figures.first().attr("userData",$.extend(userData, this.documentConfiguration))
    }
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
