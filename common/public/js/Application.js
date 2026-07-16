import AppFrame from "./ApplicationFrame"
import AuthorPage from "./AuthorPage"
import welcomeMessage from "./WelcomeMessage"

import Files from "./FilesScreen"
import StorageScreen from "./storage/StorageScreen"
import DraftScreen from "./storage/DraftScreen"
import WorkspaceScreen from "./workspace/WorkspaceScreen"
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
            // Two document panes: "Files" (shared originals) and "Draft" (the
            // caller's own personal copies). filePane stays the primary handle;
            // draftPane is refreshed alongside it after promote/revert/delete.
            this.filePane = new StorageScreen(this, conf)
            this.draftPane = new DraftScreen(this, conf)
            // The Workspaces browser (account-scoped, app-agnostic).
            this.workspacePane = new WorkspaceScreen(this, conf)
        } else {
            this.filePane = new Files(this, conf, permissions[this.objectType])
        }
        // The help/readme pane. Renders lazily on first show (onShow), like the
        // other panes — no eager render here.
        this.readmePane = new AuthorPage("#readme", `readme/en/${conf.application}/README.sheet`, "#index_tab a")

        // The editor "pane" has no screen class of its own (it's the canvas), but
        // gets the same onShow() hook for consistency with the other panes.
        // Currently a no-op; a later change could re-center/redraw here.
        $("#editor_tab a").off("click.editor").on("click.editor", () => this.onEditorShow())


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

    // The editor pane's onShow hook (see init). No-op for now; kept so every
    // pane — Editor, Drafts, Files, Help — has the same "became visible" entry.
    onEditorShow(){
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

    // A promote/revert/delete/save changes what BOTH panes show (a draft may
    // appear/vanish, an original may gain/lose its "has draft" marker), so
    // refresh both. Each pane's reload() decides for itself: reload now if it's
    // the visible pane, otherwise mark stale and reload when next shown.
    refreshFinders() {
        this.filePane?.reload()
        this.draftPane?.reload()
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
            .then((res) => toast(res && res.status === "committed" ? t("message.promoted") : t("message.pending_review")))
            .then(() => this.refreshFinders())
            .catch((err) => { if (err) console.log(err) })
    }

    // Revert: discard the personal copy and see the official version again.
    // Not reversible — confirm first.
    revertById(id) {
        return confirmDialog.show(t("dialog.revert_explain"))
            .then(() => this.storage.revert(id))
            .then(() => toast(t("message.reverted")))
            .then(() => this.refreshFinders())
            .catch((err) => { if (err) console.log(err) })
    }

    // Delete: throw away a purely personal document (no shared version to fall
    // back to). Not reversible — confirm first.
    deleteById(id) {
        return confirmDialog.show(t("dialog.delete_explain"))
            .then(() => this.storage.remove(id))
            .then(() => toast(t("message.deleted")))
            .then(() => this.refreshFinders())
            .catch((err) => { if (err) console.log(err) })
    }

}