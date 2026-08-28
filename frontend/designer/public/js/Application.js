import GenericApplication from "../../common/js/Application"


import toast from "../../common/js/toast"
import checkElement from "../../common/js/checkElement"
import confirmDialog from "../../common/js/ConfirmDialog"
import notFoundDialog from "../../common/js/NotFoundDialog"
import defaultEditorHeader from "../../common/js/editor/DefaultEditorHeader"

import View from "./View"
import Toolbar from "./Toolbar"
import Layer from "./Layer"
import FilterPane from "./FilterPane"
import SelectionToolPolicy from './policy/SelectionToolPolicy'
import conf from "./Configuration"
import fileSave from "./dialog/FileSave"
import NewDocumentDialog from "../../common/js/storage/NewDocumentDialog"

import storageFactory from './io/DesignerStorage'
let storage = storageFactory(conf)


class Application extends GenericApplication {
  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor() {
    super("shapes")
    this.newDialog = new NewDocumentDialog(storage, conf)
  }

  init(){
    super.init(conf)
    // super.init builds the scope-based finder (StorageScreen, Draft, Workspace,
    // Review) because conf.database is set, and wires this.storage to the plain
    // StorageClient. The designer needs its own client — open/save carry the
    // .shape, not `content` — so replace this.storage with DesignerStorage. The
    // finder actions it drives (promote/revert/delete/distribute) are identical.
    this.storage = storage
    return new Promise( (resolve, reject) => {

      this.documentConfigurationTempl = {
        baseClass: "draw2d.SetFigure",
        code: $("#shape-edit-template").text().trim()
      }

      // automatic add the configuration to the very first shape
      // in the document as userData
      //
      this.documentConfiguration = {...this.documentConfigurationTempl}
  
      this.view = new View(this, "canvas")
      this.toolbar = new Toolbar(this, "#editor .toolbar", this.view)
      this.layer = new Layer(this, "layer_elements", this.view)
      this.filter = new FilterPane(this, "#filter .filter_actions", this.view)

      this.view.installEditPolicy(new SelectionToolPolicy())
  
      // deep-links:
      //   ?doc=<handle>   open a component by its opaque handle. The simulator
      //                   resolves name+scope to a handle first (/part/resolve),
      //                   so "Open in Designer" lands here too.
      //   ?global=<path>  keep the old name-based link working
      let doc = this.getParam("doc")
      let global = this.getParam("global")
      let tab = this.getParam("tab")
      if (doc) {
        this.openDoc(doc)
          .then(() => this.restoreTab(tab))
      }
      else if (global) {
        this.openGlobal(decodeURIComponent(global))
          .then(() => this.restoreTab(tab))
      }
      else {
        this.showWelcomeMessage("/digital/gate/IEC60617-12/AND.shape")
          .then(() => this.restoreTab(tab))
      }
 
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
    .then(()=> this.newDialog.show(conf.fileNew))
    .then(({ name, scopeRef })=>{
      this.fileNew(name, scopeRef)
      // Persist the empty component right away, so it exists and can be opened
      // and promoted; the server renders its (empty) derived members.
      return storage.save({ id: null, name, scopeRef, shape: JSON.stringify({ draw2d: [] }) })
    })
    .then((res)=>{
      this.currentFile.id = res.id
      if (res.path) this.currentFile.name = res.path
      // Reflect where the component now lives (the caller's leaf) in the header.
      this.currentFile.scope = res.providedBy
      this.currentFile.personal = res.personal
      this.hasUnsavedChanges = false
      toast(t("common:message.created"))
      $("#editorFileSave div").removeClass("highlight")
      defaultEditorHeader.update(this.currentFile)
    })
    .catch( (error)=>{
      if (error) console.log(error)
    })
  }


  fileNew(name, scopeRef) {
    $("#leftTabStrip .editor").click()
    this.view.reset()
    // No id yet — a brand-new component. scopeRef (from the New dialog) is the
    // workspace it will be saved to; the old user/global scope tag is gone.
    this.currentFile = { id: null, name: name ?? conf.fileNew, scopeRef: scopeRef ?? null }
    this.documentConfiguration = {...this.documentConfigurationTempl}
    this.view.getCommandStack().markSaveLocation()
    this.view.centerDocument()
    defaultEditorHeader.update(this.currentFile)
  }

  fileSave(description="") {
    this.setConfiguration()
    return new Promise((resolve, reject) => {
      // Whether a save can go to a shared scope is now decided by the scope
      // model (membership + review on promote), not by a global-update flag.
      // The designer just saves; the server places it and reviews on promote.
      return fileSave.show(this.currentFile, this.view, storage, description).then(resolve, reject)
    })
    .then( ()=>{
      this.hasUnsavedChanges = false
      toast(t("common:message.saved"))
      $("#editorFileSave div").removeClass("highlight")
      this.refreshFinders()
      defaultEditorHeader.update(this.currentFile)
    })
    .catch( err => {
      console.log(err)
    })
  }

  openDoc(id, version){
    this.view.reset()
    $("#leftTabStrip .editor").click()
    this.hideWelcomeMessage()
    return storage.open(id)
      .then((doc) => {
        this.view.reset()
        // The endpoint returns only the .shape (the sole thing the designer
        // authors); parse it into the draw2d model.
        let content = typeof doc.shape === "string" ? JSON.parse(doc.shape) : doc.shape
        let reader = new draw2d.io.json.Reader()
        reader.unmarshal(this.view, content.draw2d ?? content)
        this.getConfiguration()
        this.view.getCommandStack().markSaveLocation()
        this.view.centerDocument()
        this.hasUnsavedChanges = false
        $("#editorFileSave div").removeClass("highlight")
        this.currentFile = { id: doc.id, name: doc.name, version: doc.version, scope: doc.providedBy, personal: doc.personal }
        defaultEditorHeader.update(this.currentFile)
        return doc
      })
      .then((doc) => {
        history.pushState({ id: 'editor', doc: doc.id },
          conf.application + ' | ' + doc.name,
          window.location.href.split('?')[0] + '?doc=' + encodeURIComponent(doc.id))
        return doc
      })
      .catch( error => {
        console.log(error)
        notFoundDialog.show(id)
      })
  }

  // Resolve a shared component by path (?global=<path>) to a handle, then open
  // it - keeps old name-based links working.
  openGlobal(path) {
    return storage.resolveGlobal(path)
      .then((res) => this.openDoc(res.id))
      .catch((error) => { console.log(error); notFoundDialog.show(path) })
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
