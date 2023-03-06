import GenericApplication from "../../common/js/Application"


import toast from "../../common/js/toast"
import checkElement from "../../common/js/checkElement"
import confirmDialog from "../../common/js/ConfirmDialog"
import notFoundDialog from "../../common/js/NotFoundDialog"

import View from "./View"
import Toolbar from "./Toolbar"
import Layer from "./Layer"
import FilterPane from "./FilterPane"
import SelectionToolPolicy from './policy/SelectionToolPolicy'
import conf from "./Configuration"
import fileSave from "./dialog/FileSave"
import fileCreate from "./dialog/FileCreate"

import storageFactory from '../../common/js/BackendStorage'
let storage = storageFactory(conf)


class Application extends GenericApplication {
  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor() {
    super("shapes")
  }

  init(permissions){
    super.init(permissions, conf)
    return new Promise( (resolve, reject) => {

      this.documentConfigurationTempl = {
        baseClass: "draw2d.SetFigure",
        code: $("#shape-edit-template").text().trim()
      }
  
      $( "body" )
        .on( ".mousetrap-pause", "focus", () => {
          Mousetrap.pause()
        })
        .on(".mousetrap-pause", "blur",  () => {
          Mousetrap.unpause()
        });
  
      // automatic add the configuration to the very first shape
      // in the document as userData
      //
      this.documentConfiguration = { ...this.documentConfigurationTempl}
  
      this.view = new View(this, "canvas", permissions)
      this.toolbar = new Toolbar(this, "#editor .toolbar", this.view, permissions)
      this.layer = new Layer(this, "layer_elements", this.view, permissions)
      this.filter = new FilterPane(this, "#filter .filter_actions", this.view, permissions)

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
        this.showWelcomeMessage("/digital/gate/IEC60617-12/AND.shape")
      }
  
      // check if the user has added a "file" parameter. In this case we load the shape from
      // the draw2d.shape github repository
      //
      let tutorial = this.getParam("tutorial")
      if(tutorial) {
        this.checkForTutorialMode()
      }
      resolve(this)
    })
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
    .catch( (error)=>{
      console.log(error)
    })
  }


  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()
    this.view.reset()
    this.documentConfiguration = {...this.documentConfigurationTempl}
    this.currentFile = { name: name??conf.fileNew , scope: scope??"user"}
    this.view.getCommandStack().markSaveLocation()
    this.view.centerDocument()
  }

  fileSave() {
    this.setConfiguration()
    fileSave.show(this.currentFile, storage,this.view)
      .then( (filePath) => {
        this.hasUnsavedChanges = false
        toast(t("common:message.saved"))
        $("#editorFileSave div").removeClass("highlight")
        this.filePane.refresh(conf, this.permissions.shapes, this.currentFile)
      })
  }

  load(name, scope){
    let url = conf.backend[scope].get(name)
    this.view.reset()
    $("#leftTabStrip .editor").click()

    return storage.loadUrl(url)
      .then((content) => {
        this.view.reset()
        let reader = new draw2d.io.json.Reader()
        reader.unmarshal(this.view, content.draw2d ?? content)
        this.getConfiguration()
        this.view.getCommandStack().markSaveLocation()
        this.view.centerDocument()
        this.hasUnsavedChanges = false
        $("#editorFileSave div").removeClass("highlight")
        this.currentFile = { name, scope}
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

  getConfiguration(key) {
    let figures = this.view.getExtFigures()
    if (figures.getSize() > 0) {
      this.documentConfiguration = {...this.documentConfiguration, ...figures.first().getUserData()}
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
    this.documentConfiguration = {...this.documentConfiguration, ...conf}
    let figures = this.view.getExtFigures()
    if (figures.getSize() > 0) {
      let userData = figures.first().attr("userData")
      delete this.documentConfiguration.name
      figures.first().attr("userData",{...userData, ...this.documentConfiguration})
    }
  }

}


let app = new Application()
export default app
