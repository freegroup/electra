import GenericApplication from "../../common/js/Application"
import toast from "../../common/js/toast"
import notFoundDialog from "../../common/js/NotFoundDialog"

import Toolbar from "./Toolbar"
import Palette from "./Palette"
import View from "./View"
import conf from "./Configuration"
import reader from "./io/Reader"
import writer from "./io/Writer"
import progress from "./dialog/Progress"
import confirmDialog from "../../common/js/ConfirmDialog"

import storageFactory from "../../common/js/storage/StorageClient"
import SaveDialog from "../../common/js/storage/SaveDialog"
import NewDocumentDialog from "../../common/js/storage/NewDocumentDialog"
import PublishDialog from "../../common/js/storage/PublishDialog"

let storage = storageFactory(conf)

// currentFile is { id, name, version, editable } where id is the opaque handle
// the backend minted. All operations name the document by id; the frontend
// never sees scope/path as request inputs.
class Application extends GenericApplication {

  constructor() {
    super("brains")
    this.saveDialog       = new SaveDialog(storage, conf)
    this.newDialog        = new NewDocumentDialog(storage, conf)
    this.publishDialog    = new PublishDialog(storage, conf)
  }

  init(permissions) {
    super.init(permissions, conf)
    return new Promise((resolve, reject) => {
      this.palette = new Palette(permissions)
      this.view    = new View("draw2dCanvas", permissions)
      this.toolbar = new Toolbar(this, this.view, "#editor .toolbar", permissions)

      // deep-link: ?doc=<id> opens a document by its opaque handle.
      let doc = this.getParam("doc")
      if (doc) {
        this.open(doc)
      } else {
        this.showWelcomeMessage("guides/intro.brain")
      }

      resolve(this)
    })
  }

  // Publish the current document version as an anonymous public link.
  fileShare() {
    if (!this.currentFile) return Promise.resolve()
    return this.fileSave(t("message.save_before_share"))
      .then(() => this.publishDialog.show(this.currentFile.id, this.currentFile.version))
      .catch((error) => { if (error) console.log(error) })
  }

  // Create a brand-new document: choose a name, then write version 1.
  fileCreateNew() {
    return new Promise((resolve, reject) => {
      if (this.hasUnsavedChanges === true) {
        return confirmDialog.show(t("common:message.unsaved_changes")).then(resolve, reject)
      }
      return resolve()
    })
      .then(() => this.newDialog.show(conf.fileNew))
      .then(({ name }) => {
        this.fileNew(name)
        return this._writeCurrent()
      })
      .then(() => {
        this.hasUnsavedChanges = false
        toast(t("common:message.created"))
        $("#editorFileSave div").removeClass("highlight")
        this.markFindersDirty()
      })
      .catch((error) => { if (error) console.log(error) })
  }

  // Reset to a fresh unsaved document with the given name.
  fileNew(name) {
    $("#leftTabStrip .editor").click()
    this.currentFile = { id: null, name: name ?? "MyNewCircuit", version: undefined, editable: true }
    this.view.clear()
    this.view.getCommandStack().markSaveLocation()
    this.view.centerDocument()
  }

  fileSave(description = "") {
    if (!this.currentFile) {
      return this.fileCreateNew()
    }
    return this.saveDialog.show(this.currentFile)
      .then(({ name }) => {
        this.currentFile.name = name
        return this._writeCurrent()
      })
      .then(() => {
        this.hasUnsavedChanges = false
        toast(t("common:message.saved"))
        $("#editorFileSave div").removeClass("highlight")
        this.markFindersDirty()
      })
      .catch((err) => { if (err) console.log(err) })
  }

  // Marshal the canvas and save it. A null id creates a new document; otherwise
  // it writes a new version. The backend returns the (possibly new) handle.
  _writeCurrent() {
    this.view.setCurrentSelection(null)
    return writer.marshal(this.view).then((json) => {
      return storage.save({ id: this.currentFile.id, name: this.currentFile.name, content: json })
        .then((res) => {
          this.currentFile.id = res.id
          this.currentFile.version = res.version
          if (res.path) this.currentFile.name = res.path.split("/").pop()
          history.pushState(
            { id: "editor", doc: res.id },
            conf.application + " | " + this.currentFile.name,
            window.location.href.split("?")[0] + "?doc=" + encodeURIComponent(res.id))
          return res
        })
    })
  }

  open(id, version) {
    this.view.clear()
    $("#leftTabStrip .editor").click()
    this.hideWelcomeMessage()
    let loadedName = null
    return storage.open(id, version)
      .then((doc) => {
        loadedName = doc.name
        this.view.clear()
        progress.show()
        return reader.unmarshal(this.view, doc.content, progress.update.bind(progress)).then(() => {
          progress.hide()
          this.view.getCommandStack().markSaveLocation()
          this.view.centerDocument()
          this.hasUnsavedChanges = false
          $("#editorFileSave div").removeClass("highlight")
          this.currentFile = { id: doc.id, name: doc.name, version: doc.version, editable: doc.editable }
          return doc
        })
      })
      .then(() => {
        history.pushState(
          { id: "editor", doc: id },
          conf.application + " | " + (this.currentFile ? this.currentFile.name : ""),
          window.location.href.split("?")[0] + "?doc=" + encodeURIComponent(id))
      })
      .catch((error) => {
        console.log(error)
        progress.hide() // a failed/corrupt load must not leave the loader up
        notFoundDialog.show(loadedName || id)
      })
  }
}

let app = new Application()
export default app
