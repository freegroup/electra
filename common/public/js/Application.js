import AppFrame from "./ApplicationFrame"
import AuthorPage from "./AuthorPage"
import welcomeMessage from "./WelcomeMessage"

import Files from "./FilesScreen"
import StorageScreen from "./storage/StorageScreen"
import DraftScreen from "./storage/DraftScreen"
import WorkspaceScreen from "./workspace/WorkspaceScreen"
import ReviewScreen from "./review/ReviewScreen"
import ActivityScreen from "./activity/ActivityScreen"
import session from "./session"
import storageFactory from "./storage/StorageClient"
import confirmDialog from "./ConfirmDialog"
import promoteDialog from "./storage/PromoteDialog"
import deleteDialog from "./storage/DeleteDialog"
import distributeDialog from "./storage/DistributeDialog"
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

    // Darf am offenen Dokument ueberhaupt geaendert werden? Falsch nur fuer eine
    // zur Pruefung geladene Fassung - die ist versionsfest, ein Schreibvorgang
    // wuerde sie in die persoenliche Ablage des Pruefers abzweigen.
    //
    // EINE Quelle fuer alle Stellen, die etwas veraendern. Vorher fragte allein
    // fileSave() das Merkmal ab, weshalb sich im Pruefmodus per Doppelklick
    // weiter bearbeiten und loeschen liess - nur eben folgenlos.
    isEditable() {
        return !(this.currentFile && this.currentFile.editable === false)
    }

    init (permissions, conf) {
        super.init(permissions, conf)
        this.hasUnsavedChanges = false

        // Apps that opt into the database REST model (conf.database) get the new
        // scope-based finder; everyone else keeps the folder-based FilesScreen.
        if (conf.database) {
            this.storage = storageFactory(conf)
            // Files (all docs in the public/anonymous scopes) and Workspaces
            // (the public workspaces) are readable without an identity, so they
            // load for anonymous visitors too.
            this.filePane = new StorageScreen(this, conf)
            this.workspacePane = new WorkspaceScreen(this, conf)
            // Draft (the caller's own personal copies) and the Review inbox are
            // account-scoped — meaningless without an identity, and their
            // requests need one. For an anonymous visitor, hide those tabs and
            // skip the panes so no account-scoped request is ever issued. Both
            // stay undefined then — every use of them is optional-chained.
            if (session.isLoggedIn()) {
              this.draftPane = new DraftScreen(this, conf)
              this.reviewPane = new ReviewScreen(this, conf)
              this.activityPane = new ActivityScreen(this, conf)
            } else {
              $("#draft_tab, #review_tab, #activity_tab").hide()
            }
        } else {
            this.filePane = new Files(this, conf, permissions[this.objectType])
        }
        // The help/readme pane. Renders lazily on first show (onShow), like the
        // other panes — no eager render here.
        this.readmePane = new AuthorPage("#readme", `readme/{{lng}}/${conf.application}/README.sheet`, "#index_tab a")

        // Deep-link tab routing: update ?tab= on every tab switch so reloads
        // land on the same pane; restore from ?tab= on initial load via
        // restoreTab() — called by subclasses after doc/review is handled.
        const validTabs = new Set(
            $('a[data-toggle="tab"][href^="#"]').map((_i, el) => $(el).attr('href').slice(1)).get()
        )
        const editorTab = 'editor'
        this._validTabs = validTabs
        $('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
            const id = $(e.target).attr('href').replace('#', '')
            if (!validTabs.has(id)) return
            // Editor keyboard shortcuts (move/copy figures, arrow keys) only make
            // sense on the canvas. Pause Mousetrap on every other tab so those
            // bindings don't swallow typing in inputs like the Files search box.
            if (typeof Mousetrap !== 'undefined') {
                if (id === editorTab) Mousetrap.unpause()
                else Mousetrap.pause()
            }
            const url = new URL(window.location.href)
            if (id === editorTab) {
                url.searchParams.delete('tab')
            } else {
                url.searchParams.set('tab', id)
            }
            window.history.replaceState(window.history.state, '', url.toString())
        })

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
                // New scope-model apps push { doc:<opaque id> } and openDoc(id);
                // review state pushes { review:"<uuid>", path } and re-enters
                // read-only review mode; legacy folder apps push { file, scope }.
                if (event.state.review !== undefined && typeof this.openReview === 'function') {
                    this.openReview(String(event.state.review))
                } else if (event.state.doc !== undefined && typeof this.openDoc === 'function') {
                    this.openDoc(event.state.doc)
                } else if (typeof this.load === 'function') {
                    this.load(event.state.file, event.state.scope)
                }
            }
        })
    }

    // Returns a promise so callers can chain on it like they do on openDoc /
    // openGlobal / openReview. show() is synchronous today; Promise.resolve
    // passes a real promise straight through, so the day the welcome screen
    // starts fetching something (images, a featured document) no call site has
    // to change.
    showWelcomeMessage(exampleDocument){
        return Promise.resolve(welcomeMessage.show(exampleDocument))
    }

    // Open a document by its public name/path (shared app content). Powers the
    // ?global=<path> deep link and the welcome "Open Example" button, so links
    // can reference docs by name instead of an opaque id. Resolves the path to a
    // handle server-side, then opens it the normal way.
    openGlobal(path){
        return this.storage.resolveGlobal(path).then(({ id }) => this.openDoc(id)).then(() => {
            // openDoc() stamped the opaque ?doc=; swap back to the readable ?global=
            // (they are the same doc, XOR). replaceState so opening by name adds
            // no extra history entry.
            const url = new URL(window.location.href)
            url.searchParams.delete("doc")
            url.searchParams.delete("review")
            url.searchParams.set("global", path)
            history.replaceState(history.state, "", url.toString())
        })
    }

    hideWelcomeMessage(){
        welcomeMessage.hide()
    }

    // The editor pane's onShow hook (see init). No-op for now; kept so every
    // pane — Editor, Drafts, Files, Help — has the same "became visible" entry.
    onEditorShow(){
    }

    // Activate the tab named by ?tab= in the URL (if any). Subclasses call this
    // after loading the initial doc/review, so the document is in memory before
    // the pane switch happens.
    // Navigate to a new URL state, preserving all existing query params and
    // merging in the given ones. The caller says "navigate to this doc/review",
    // not "do a pushState" — the history mechanics are an implementation detail.
    navigate(params, title) {
        const url = new URL(window.location.href)
        // doc / review / global all identify the SAME document a different way,
        // so they are mutually exclusive (XOR): setting one clears the others,
        // the URL never carries two at once.
        const idParams = ["doc", "review", "global"]
        if (idParams.some((k) => k in params)) {
            idParams.forEach((k) => url.searchParams.delete(k))
        }
        for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
        history.pushState({ id: "editor", ...params }, title || '', url.toString())
        if (params.tab) {
            $(`a[href="#${params.tab}"][data-toggle="tab"]`).tab('show')
        }
    }

    restoreTab(tab) {
        tab = tab || new URL(window.location.href).searchParams.get('tab')
        if (tab && this._validTabs && this._validTabs.has(tab)) {
            $(`a[href="#${tab}"][data-toggle="tab"]`).tab('show')
        }
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
        // keep the Review- and Activity-tab counts in sync with document activity
        this.reviewPane?.refreshCount()
        this.activityPane?.refreshCount()
    }

    // Ask the user whether to open their private draft or the shared original,
    // then open the chosen one. Used by the Files pane when a row's path also
    // has a personal draft.
    openWithConflict({ originalId, version, draftId }) {
        return openConflictDialog.show()
            .then((choice) => {
                if (choice === "draft") return this.openDoc(draftId)
                return this.openDoc(originalId, version)
            })
            .catch((err) => { if (err) console.log(err) })
    }

    // Promote: make the caller's version the shared one for everyone who sees
    // the document under the same "provided by" group. Confirms first; the
    // optional description travels to the reviewers when approval is needed.
    promoteById(id) {
        return promoteDialog.show(t("dialog.promote_explain"))
            .then((description) => this.storage.promote(id, description))
            .then((res) => toast(res && res.status === "committed" ? t("message.promoted") : t("message.pending_review")))
            .then(() => this.refreshFinders())
            .catch((err) => { if (err) console.log(err) })
    }

    // Distribute (horizontal): pick scopes the caller is a member of and deliver
    // this draft into each. Every target applies the same review rules as promote
    // (no target goes live immediately unless its threshold is 0 / self-approval).
    // Takes the whole draft item so the picker can exclude its own scope.
    distributeById(item) {
        return this.storage.distributeTargets(item.id)
            .then((scopes) => distributeDialog.show({
                scopes,
                explain: t("dialog.distribute_explain"),
            }))
            .then(({ targets, description }) => this.storage.distribute(item.id, targets, description))
            .then((res) => {
                let results = (res && res.results) || []
                let live = results.filter((r) => r.status === "committed" || r.status === "deleted").length
                let review = results.filter((r) => r.status === "pending").length
                toast(t("message.distributed", { total: results.length, live, review }))
            })
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

    // Request deletion of a SHARED document. The wording is always "request
    // deletion": whether it commits at once or opens a review is the scope's
    // call, not something the button should predict — and having (or not having)
    // a personal copy must not change what the button says. The uuid names the
    // exact shared version, so the caller's own copy is never touched; the
    // returned status reports what actually happened.
    deleteSharedById(item) {
        let label = t("button.request_delete")
        return deleteDialog.show(t("dialog.delete_shared_request_explain"), { title: label, okLabel: label })
            .then((description) => this.storage.deleteShared(item.uuid, description))
            .then((res) => toast(res && res.status === "deleted"
                ? t("message.deleted")
                : t("message.delete_requested")))
            .then(() => this.refreshFinders())
            .catch((err) => { if (err) console.log(err) })
    }

}