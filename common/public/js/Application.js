import AppFrame from "./ApplicationFrame"
import AuthorPage from "./AuthorPage"
import welcomeMessage from "./WelcomeMessage"

import Files from "./FilesScreen"
import StorageScreen from "./storage/StorageScreen"
import DraftScreen from "./storage/DraftScreen"
import storageFactory from "./storage/StorageClient"
import confirmDialog from "./ConfirmDialog"
import openConflictDialog from "./storage/OpenConflictDialog"
import toast from "./toast"

export default class Application extends AppFrame{

    constructor(objectType) {
        super()
        this.currentFile = null
        this.hasUnsavedChanges = false
        this.objectType = objectType

        /*
        $("body")
        .on( "focus", ".mousetrap-pause", Mousetrap.pause)
        .on( "blur",  ".mousetrap-pause", Mousetrap.unpause)
        */
    }

    init (permissions, conf) {
        super.init(permissions, conf)
        this.hasUnsavedChanges = false

        // Apps that opt into the database REST model (conf.database) get the new
        // scope-based finder; everyone else keeps the folder-based FilesScreen.
        if (conf.database) {
            this.storage = storageFactory(conf)
            // Two panes: "Files" (shared originals) and "Draft" (the caller's
            // own personal copies). filePane stays the primary handle; draftPane
            // is refreshed alongside it after promote/revert/delete.
            this.filePane = new StorageScreen(this, conf, permissions[this.objectType])
            this.draftPane = new DraftScreen(this, conf, permissions[this.objectType])
        } else {
            this.filePane = new Files(this, conf, permissions[this.objectType])
        }
        this.readmePane = new AuthorPage("#readme", `readme/en/${conf.application}/README.sheet`)
        this.readmePane.render()


        // Show the user an alert if there are unsaved changes
        //
        window.onbeforeunload = () => {
            return this.hasUnsavedChanges ? t("common:message.changes_get_lost") : undefined;
        }

        // listen on the history object to load files
        //
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.id === 'editor') {
                // New scope-model apps push { doc:<opaque id> } and open(id);
                // legacy folder apps push { file, scope } and load(name, scope).
                if (event.state.doc !== undefined && typeof this.open === 'function') {
                    this.open(event.state.doc)
                } else if (typeof this.load === 'function') {
                    this.load(event.state.file, event.state.scope)
                }
            }
        })
    }

    showWelcomeMessage(exampleDocument){
        welcomeMessage.show(exampleDocument)
    }

    hideWelcomeMessage(){
        welcomeMessage.hide()
    }

    showLoginHint(){
        new Anno([
            {
              target: '.userinfo_toggler',
              content: t("common:message.authenticate_before_save"),
               position: {
                top: '4em',
                right: '1em'
              },
              arrowPosition: 'center-top',
              buttons : []
            }
          ]).show()
    }

    // --- finder actions on a document (by opaque id) ------------------------
    // Shared by every scope-model app; the finder (StorageScreen) calls these.
    // They are pure storage operations, so they live in the base rather than
    // each app.

    // A promote/revert/delete changes what BOTH panes show (a draft may vanish,
    // an original may gain/lose its "my copy" marker), so refresh both. Used by
    // finder-internal actions where the user is looking at the list now, so it
    // reloads immediately.
    refreshFinders() {
        if (this.filePane) this.filePane.reload()
        if (this.draftPane) this.draftPane.reload()
    }

    // Mark both panes stale without reloading now — used after a save/create,
    // where the user stays in the editor and the lists reload lazily on show.
    markFindersDirty() {
        if (this.filePane) this.filePane.refresh()
        if (this.draftPane) this.draftPane.refresh()
    }

    // Ask the user whether to open their private draft or the shared original,
    // then open the chosen one. Used by the Files pane when a row's path also
    // has a personal draft.
    openWithConflict({ originalId, version, draftId }) {
        return openConflictDialog.show()
            .then((choice) => {
                if (choice === "draft") return this.open(draftId)
                return this.open(originalId, version)
            })
            .catch((err) => { if (err) console.log(err) })
    }

    // Promote: make the caller's version the shared one for everyone who sees
    // the document under the same "provided by" group. Confirms first.
    promoteById(id) {
        return confirmDialog.show(t("dialog.promote_explain"))
            .then(() => this.storage.promote(id))
            .then((res) => {
                toast(res && res.status === "committed" ? t("message.promoted") : t("message.pending_review"))
                this.refreshFinders()
            })
            .catch((err) => { if (err) console.log(err) })
    }

    // Revert: discard the personal copy and see the official version again.
    // Not reversible — confirm first.
    revertById(id) {
        return confirmDialog.show(t("dialog.revert_explain"))
            .then(() => this.storage.revert(id))
            .then(() => { toast(t("message.reverted")); this.refreshFinders() })
            .catch((err) => { if (err) console.log(err) })
    }

    // Delete: throw away a purely personal document (no shared version to fall
    // back to). Not reversible — confirm first.
    deleteById(id) {
        return confirmDialog.show(t("dialog.delete_explain"))
            .then(() => this.storage.remove(id))
            .then(() => { toast(t("message.deleted")); this.refreshFinders() })
            .catch((err) => { if (err) console.log(err) })
    }

}