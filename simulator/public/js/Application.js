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
import reviewClientFactory from "../../common/js/review/ReviewClient"
import reviewEditorHeader from "../../common/js/editor/ReviewEditorHeader"
import defaultEditorHeader from "../../common/js/editor/DefaultEditorHeader"

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
      this.palette = new Palette()
      this.view    = new View("draw2dCanvas", permissions)
      this.toolbar = new Toolbar(this, this.view, "#editor .toolbar", permissions)

      // deep-links: ?doc=<id> opens a document by its opaque handle;
      // ?review=<uuid>&path=<docPath> loads a pending version read-only for review.
      let doc = this.getParam("doc")
      let review = this.getParam("review")
      if (review) {
        this.openReview(decodeURIComponent(review))
      } else if (doc) {
        this.open(doc)
      } else {
        this.showWelcomeMessage("guides/intro.brain")
      }

      resolve(this)
    })
  }

  // Load a pending version read-only for review and show the Approve/Reject
  // bar. Content comes over the review BFF (version-pinned read) — pending
  // versions are invisible to the normal open() walk-up.
  openReview(uuid) {
    $("#leftTabStrip .editor").click()
    this.hideWelcomeMessage()
    return reviewClientFactory().doc(uuid)
      .then((doc) => {
        this.view.readOnly = true
        this.view.clear()
        progress.show()
        return reader.unmarshal(this.view, doc.data, progress.update.bind(progress)).then(() => {
          progress.hide()
          this.view.getCommandStack().markSaveLocation()
          this.view.centerDocument()
          this.hasUnsavedChanges = false
          this.currentFile = { id: null, name: doc.path, version: doc.version, editable: false }
          history.pushState(
            { id: "editor", review: uuid, path: doc.path },
            conf.application + " | " + this.currentFile.name,
            window.location.href.split("?")[0]
              + "?review=" + encodeURIComponent(uuid)
              + "&path=" + encodeURIComponent(doc.path))
          reviewEditorHeader.show({
            uuid,
            onDone: () => {
              this.fileNew()
              $("#review_tab a").click()
              this.reviewPane?.reload()
            },
          })
        })
      })
      .catch((error) => {
        console.log(error)
        progress.hide()
        toast(t("pane.review.load_failed"))
      })
  }

  // Publish the current document version as an anonymous public link.
  fileShare() {
    if (!this.currentFile) return Promise.resolve()
    return this.fileSave()
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
        this.refreshFinders()
      })
      .catch((error) => { if (error) console.log(error) })
  }

  // Reset to a fresh unsaved document with the given name.
  fileNew(name) {
    $("#leftTabStrip .editor").click()
    this.currentFile = { id: null, name: name ?? "MyNewCircuit", version: undefined, editable: true }
    this.view.readOnly = false
    this.view.clear()
    this.view.getCommandStack().markSaveLocation()
    this.view.centerDocument()
    defaultEditorHeader.update(this.currentFile)
  }

  fileSave() {
    // A document opened for review is read-only — never save it (that would fork
    // a pending version into the reviewer's personal workspace).
    if (this.currentFile && this.currentFile.editable === false) {
      return Promise.resolve()
    }
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
        this.refreshFinders()
        defaultEditorHeader.update(this.currentFile)
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
          if (res.path) this.currentFile.name = res.path
          history.pushState(
            { id: "editor", doc: res.id },
            conf.application + " | " + this.currentFile.name,
            window.location.href.split("?")[0] + "?doc=" + encodeURIComponent(res.id))
          return res
        })
    })
  }

  open(id, version) {
    // A normally-opened document is always editable (edits become the caller's
    // personal copy); only the review path is read-only.
    this.view.readOnly = false
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
          this.currentFile = { id: doc.id, name: doc.path, version: doc.version, editable: doc.editable }
          defaultEditorHeader.update(this.currentFile)
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
