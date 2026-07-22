import GenericApplication from "../../common/js/Application"
import confirmDialog from "../../common/js/ConfirmDialog"
import notFoundDialog from "../../common/js/NotFoundDialog"
import toast from "../../common/js/toast"
import exportModePrompt from "./dialog/SelectExportMode"

import Toolbar from "./Toolbar"
import View from "./view"
import conf from "./Configuration"
import Document from "./model/document"
import commandStack from "./commands/CommandStack"

import storageFactory from "../../common/js/storage/StorageClient"
import SaveDialog from "../../common/js/storage/SaveDialog"
import NewDocumentDialog from "../../common/js/storage/NewDocumentDialog"
import PublishDialog from "../../common/js/storage/PublishDialog"
import reviewClientFactory from "../../common/js/review/ReviewClient"
import reviewEditorHeader from "../../common/js/editor/ReviewEditorHeader"
import defaultEditorHeader from "../../common/js/editor/DefaultEditorHeader"

let storage = storageFactory(conf)

// currentFile is { id, name, version, editable } where id is the opaque handle
// the sheets backend minted. All operations name the document by id; the
// frontend never sees scope/path as request inputs.
class Application extends GenericApplication {

  constructor() {
    super("sheets")
    this.saveDialog    = new SaveDialog(storage, conf)
    this.newDialog     = new NewDocumentDialog(storage, conf)
    this.publishDialog = new PublishDialog(storage, conf)
  }

  init(permissions) {
    super.init(permissions, conf)
    return new Promise((resolve, reject) => {
      this.document = null

      this.view    = new View(this, "#editor .content", permissions)
      this.toolbar = new Toolbar(this, this.view, ".toolbar", permissions)

      // deep-links: ?doc=<id> opens a document by its opaque handle;
      // ?review=<uuid>&path=<docPath> loads a pending version read-only for review.
      let doc = this.getParam("doc")
      let review = this.getParam("review")
      let tab = this.getParam("tab")
      if (review) {
        this.openReview(decodeURIComponent(review))
        this.restoreTab(tab)
      } else if (doc) {
        this.open(doc).then(() => this.restoreTab(tab))
      } else {
        this.showWelcomeMessage("/basic/math/binary-addition.sheet")
        this.restoreTab(tab)
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
        let path = doc.path
        this.currentFile = { id: null, name: path, version: doc.version, editable: false }
        this.setDocument(new Document(doc.data), 0)
        commandStack.markSaveLocation()
        this.hasUnsavedChanges = false
        const reviewUrl = new URL(window.location.href)
        reviewUrl.searchParams.set("review", encodeURIComponent(uuid))
        reviewUrl.searchParams.set("path", encodeURIComponent(path))
        this.navigate({ review: uuid, path },
          conf.application + " | " + this.currentFile.name)
        reviewEditorHeader.show({
          uuid,
          onDone: () => {
            this.fileNew()
            $("#review_tab a").click()
            this.reviewPane?.reload()
          },
        })
      })
      .catch((error) => {
        console.log(error)
        toast(t("pane.review.load_failed"))
      })
  }

  // Publish the current document as an anonymous public link.
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
    // A fresh document replaces the intro splash — otherwise the welcome
    // overlay stays up and the new (empty) canvas looks like nothing happened.
    this.hideWelcomeMessage()
    this.currentFile = { id: null, name: name ?? "MyNewDocument", version: undefined, editable: true }
    this.setDocument(new Document(), 0)
    commandStack.markSaveLocation()
    defaultEditorHeader.update(this.currentFile)
  }

  fileSave() {
    // A document opened for review is read-only — never save it (that would fork
    // a pending version into the reviewer's personal workspace).
    if (this.currentFile && this.currentFile.editable === false) {
      return Promise.resolve()
    }
    this.view.onCommitEdit()
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

  // Serialize the document and save it. A null id creates a new document;
  // otherwise it writes a new version. The backend returns the (new) handle.
  _writeCurrent() {
    this.view.onCommitEdit()
    let content = this.document.toJSON()
    return storage.save({ id: this.currentFile.id, name: this.currentFile.name, content })
      .then((res) => {
        this.currentFile.id = res.id
        this.currentFile.version = res.version
        if (res.path) this.currentFile.name = res.path
        this.navigate({ doc: res.id },
          conf.application + " | " + this.currentFile.name)
        return res
      })
  }

  onPDFExport() {
    if (!this.currentFile) return Promise.resolve()
    Promise.resolve()
      .then(() => {
        if (this.hasUnsavedChanges) {
          return this.fileSave()
        }
        return true
      })
      .then(() => {
        if (this.getDocument().hasLearningContent()) {
          return exportModePrompt.show()
        }
        return "worksheet"
      })
      .then((mode) => {
        // The PDF endpoint publishes the doc (login-free public render) itself,
        // keyed by the opaque handle.
        window.open(`../sheets/pdf?id=${encodeURIComponent(this.currentFile.id)}&mode=${mode}`, "_blank")
      })
      .catch((error) => { if (error) console.log(error) })
  }

  open(id, version) {
    $("#leftTabStrip .editor").click()
    this.hideWelcomeMessage()
    return storage.open(id, version)
      .then((doc) => {
        this.currentFile = { id: doc.id, name: doc.path, version: doc.version, editable: doc.editable }
        this.setDocument(new Document(doc.content), 0)
        commandStack.markSaveLocation()
        defaultEditorHeader.update(this.currentFile)
        return doc
      })
      .then(() => {
        this.navigate({ doc: id },
          conf.application + " | " + (this.currentFile ? this.currentFile.name : ""))
      })
      .catch((error) => {
        console.log(error)
        notFoundDialog.show(id)
      })
  }

  setDocument(document, pageIndex) {
    this.document = document
    // the "setDocument" is used by the CommandStack for undo/redo
    // therefore a "markSaveLocation" is a bad idea in this method
    this.view.onCancelEdit()
    this.view.setPage(this.document.get(pageIndex || 0))
  }

  getDocument() {
    return this.document
  }
}


let app = new Application()
export default app
