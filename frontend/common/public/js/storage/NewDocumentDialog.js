import fs from "path-browserify"
import workspaceClientFactory from "../workspace/WorkspaceClient"
import jsonStorage from "../JsonStorage"

// New document — collects the workspace it should live in and a name. The
// workspace also decides which components the palette will show (they are
// resolved against that scope), so choosing it here answers both "where does it
// save" and "what can I build with" in one place. Workspace first, then name:
// where it lives is the decision, the name is the detail.
//
// show(defaultName) -> Promise<{ name, scopeRef }>
//   name     includes the file suffix
//   scopeRef the chosen workspace, or null when the caller has none to choose
//            from (fall back to the backend's default)
const LAST_SCOPE_KEY = "newDocument.lastScopeRef"

export default class NewDocumentDialog {

  constructor(storage, conf) {
    this.storage = storage
    this.conf = conf
    this.workspaces = workspaceClientFactory()

    $("body").append(`
      <div id="newDocumentDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="media-heading" data-i18n="dialog.new_document.title">${t("dialog.new_document.title")}</h4>
            </div>
            <div class="modal-body">
              <div class="controlWithHeader newDocumentWorkspaceBlock">
                <label data-i18n="dialog.new_document.workspace">${t("dialog.new_document.workspace")}</label>
                <select class="newDocumentWorkspace"></select>
              </div>
              <div class="controlWithHeader">
                <label data-i18n="label.name">${t("label.name")}</label>
                <input type="text" class="fileName" value="">
              </div>
            </div>
            <div class="modal-footer">
              <button class="electra-button" data-dismiss="modal" data-i18n="common:button.cancel">${t("common:button.cancel")}</button>
              <button class="electra-button electra-primary okButton" data-i18n="common:button.create">${t("common:button.create")}</button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  // Fill the workspace select. "Privat" comes first and always: an empty value
  // means the server resolves the caller's personal workspace itself (save does
  // `chosenScope || personalWorkspaceId`), so no scope ref is sent for it. Then
  // every workspace the caller can write to, shown by its full path.
  _loadWorkspaces() {
    let $block = $("#newDocumentDialog .newDocumentWorkspaceBlock")
    let $select = $("#newDocumentDialog .newDocumentWorkspace").empty()
    // Private is the personal workspace — always available, no scope ref.
    $select.append(`<option value="">${t("dialog.new_document.private")}</option>`)
    return this.workspaces.visible()
      .then((list) => {
        // Only workspaces the caller is a member of can receive a new document.
        this._choices = (list || []).filter((w) => w.isMember)
        for (let w of this._choices) {
          // The stored path drops the structural prefix already; show it with
          // separators the reader expects.
          let shown = (w.path || w.label || String(w.scopeRef)).replace(/\//g, " / ")
          $select.append(`<option value="${w.scopeRef}">${shown}</option>`)
        }
        // Preselect the last-used workspace, but only if it is still offered.
        let last = jsonStorage.getItem(LAST_SCOPE_KEY)
        if (last && this._choices.some((w) => String(w.scopeRef) === String(last))) {
          $select.val(String(last))
        }
        $block.show()
      })
      .catch(() => {
        // Listing failed — Private alone is still a valid choice, keep it shown.
        this._choices = []
        $block.show()
      })
  }

  show(defaultName) {
    return new Promise((resolve, reject) => {
      let handled = false
      Mousetrap.pause()
      $("#newDocumentDialog .fileName").val(fs.basename(defaultName || this.conf.fileNew, this.conf.fileSuffix))
      this._loadWorkspaces()
      $("#newDocumentDialog").one("shown.bs.modal", (event) => $(event.currentTarget).find("input.fileName").focus())
      $("#newDocumentDialog").modal("show")

      $("#newDocumentDialog").one("hide.bs.modal", () => {
        Mousetrap.unpause()
        if (!handled) reject(false)
      })

      $("#newDocumentDialog .okButton").off("click").on("click", () => {
        let name = this.storage.sanitize($("#newDocumentDialog .fileName").val())
        if (!name) return
        // Empty value = "Privat": no scope ref, the server resolves the caller's
        // personal workspace. A real scopeRef is remembered as the last choice.
        let scopeRef = $("#newDocumentDialog .newDocumentWorkspace").val() || null
        if (scopeRef) jsonStorage.setItem(LAST_SCOPE_KEY, scopeRef)
        handled = true
        $("#newDocumentDialog").modal("hide")
        resolve({ name: name + this.conf.fileSuffix, scopeRef })
      })

      $("#newDocumentDialog .fileName").off("keypress").on("keypress", (e) => {
        if ((e.charCode || e.keyCode) === 13) $("#newDocumentDialog .okButton").click()
      })
    })
  }
}
